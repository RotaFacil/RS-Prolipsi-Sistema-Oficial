const path = require("path");

const appsDir = process.env.RSPROLIPSI_APPS_DIR
  ? path.resolve(process.env.RSPROLIPSI_APPS_DIR)
  : path.resolve(__dirname, "apps");

const paths = {
  raiz: "raiz",
  admin: "admin",
  escritorio: "escritorio",
  api: "api",
  rsshop: "rsshop",
  rswalletpay: "rswalletpay",
  rsia: "rsia"
};

function serviceConfig(name, port) {
  const cwd = path.join(appsDir, paths[name]);
  const logDir = path.join(cwd, "logs");

  return {
    name,
    script: "npm",
    args: "run start",
    interpreter: "none",
    cwd,
    env: {
      NODE_ENV: "development",
      PORT: String(port),
      LOG_DIR: logDir
    },
    env_production: {
      NODE_ENV: "production",
      PORT: String(port),
      LOG_DIR: logDir
    },
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    max_memory_restart: "512M",
    merge_logs: true,
    autorestart: true,
    watch: false,
    out_file: path.join(logDir, `${name}-pm2-out.log`),
    error_file: path.join(logDir, `${name}-pm2-error.log`)
  };
}

module.exports = {
  apps: [
    serviceConfig("raiz", 3000),
    serviceConfig("admin", 3001),
    serviceConfig("escritorio", 3002),
    serviceConfig("api", 3003),
    serviceConfig("rsshop", 3004),
    serviceConfig("rswalletpay", 3005),
    serviceConfig("rsia", 3006)
  ]
};
