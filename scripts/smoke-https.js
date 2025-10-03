#!/usr/bin/env node
/* eslint-disable no-console */

const defaultBase = process.env.RSPROLIPSI_BASE_DOMAIN;

function buildUrl(subdomainEnv, subdomain, fallback) {
  if (process.env[subdomainEnv]) {
    return process.env[subdomainEnv];
  }
  if (defaultBase) {
    return `https://${subdomain}.${defaultBase}`;
  }
  return fallback;
}

const targets = [
  { name: "admin", url: buildUrl("RSPROLIPSI_ADMIN_URL", "admin", "https://admin.rsprolipsi.com"), port: 3001 },
  { name: "escritorio", url: buildUrl("RSPROLIPSI_ESCRITORIO_URL", "escritorio", "https://escritorio.rsprolipsi.com"), port: 3002 },
  { name: "api", url: buildUrl("RSPROLIPSI_API_URL", "api", "https://api.rsprolipsi.com"), port: 3003 },
  { name: "rsshop", url: buildUrl("RSPROLIPSI_RSSHOP_URL", "shop", "https://shop.rsprolipsi.com"), port: 3004 },
  { name: "rswalletpay", url: buildUrl("RSPROLIPSI_RSWALLETPAY_URL", "wallet", "https://wallet.rsprolipsi.com"), port: 3005 },
  { name: "rsia", url: buildUrl("RSPROLIPSI_RSIA_URL", "ia", "https://ia.rsprolipsi.com"), port: 3006 }
];

const timeoutMs = Number(process.env.RSPROLIPSI_SMOKE_TIMEOUT ?? 5000);

async function check(target) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(target.url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal
    });

    if (response.status >= 200 && response.status < 400) {
      console.log(`✔ ${target.name} (${target.url}) responded with ${response.status}`);
    } else {
      console.error(`✖ ${target.name} (${target.url}) returned HTTP ${response.status}`);
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(`✖ ${target.name} (${target.url}) failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    clearTimeout(timeout);
  }
}

(async () => {
  await Promise.all(targets.map(check));
  if (process.exitCode && process.exitCode !== 0) {
    process.exit(process.exitCode);
  }
  console.log("Smoke HTTPS completed.");
})();
