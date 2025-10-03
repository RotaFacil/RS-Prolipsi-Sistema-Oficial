#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const services = [
  { name: "admin", url: "http://127.0.0.1:3001/api/health" },
  { name: "api", url: "http://127.0.0.1:3003/health" },
  { name: "rsia", url: "http://127.0.0.1:3006/health" }
];

const requiredEnv = [
  { service: "api", key: "DATABASE_URL" },
  { service: "rswalletpay", key: "DATABASE_URL" },
  { service: "rsia", key: "OPENAI_API_KEY" }
];

const secretsRoot = process.env.RSPROLIPSI_SECRETS_DIR;
if (!secretsRoot) {
  console.error("[predeploy:check] Missing RSPROLIPSI_SECRETS_DIR environment variable.");
  console.error(
    "Set RSPROLIPSI_SECRETS_DIR to the directory containing per-service .env files (e.g. /home/rsprolipsi/secrets)."
  );
  process.exit(1);
}

const envCache = new Map();
function loadEnv(filePath) {
  if (envCache.has(filePath)) {
    return envCache.get(filePath);
  }
  const parsed = {};
  if (fs.existsSync(filePath)) {
    const input = fs.readFileSync(filePath, "utf8");
    for (const line of input.split(/\r?\n/)) {
      if (!line || line.trim().startsWith("#")) continue;
      const [key, ...rest] = line.split("=");
      if (!key) continue;
      parsed[key.trim()] = rest.join("=").trim();
    }
  }
  envCache.set(filePath, parsed);
  return parsed;
}

const missingSecretsPaths = [];
for (const service of ["admin", "escritorio", "api", "rsshop", "rswalletpay", "rsia", "raiz"]) {
  const expected = path.join(secretsRoot, service, ".env");
  if (!fs.existsSync(expected)) {
    missingSecretsPaths.push(expected);
  }
}

if (missingSecretsPaths.length > 0) {
  console.error("[predeploy:check] Missing .env files in secrets directory:");
  for (const missing of missingSecretsPaths) {
    console.error(`  - ${missing}`);
  }
  process.exit(1);
}

function hasEnvValue(service, key) {
  if (process.env[key] && process.env[key].trim().length > 0) {
    return true;
  }
  const envFile = path.join(secretsRoot, service, ".env");
  const parsed = loadEnv(envFile);
  return Boolean(parsed[key] && parsed[key].length > 0);
}

const missingEnv = requiredEnv.filter(({ service, key }) => !hasEnvValue(service, key));
if (missingEnv.length > 0) {
  console.error("[predeploy:check] Required variables are missing:");
  for (const miss of missingEnv) {
    console.error(`  - ${miss.key} (service: ${miss.service})`);
  }
  console.error("Populate the secrets files or export the variables before deploying.");
  process.exit(1);
}

async function checkHealth(name, url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    console.log(`[predeploy:check] ✔ ${name} responded with ${response.status}`);
  } catch (error) {
    console.error(`[predeploy:check] ✖ ${name} health check failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    clearTimeout(timeout);
  }
}

(async () => {
  await Promise.all(services.map((svc) => checkHealth(svc.name, svc.url)));
  if (process.exitCode && process.exitCode !== 0) {
    process.exit(process.exitCode);
  }
  console.log("[predeploy:check] All validations passed.");
})();
