/**
 * PM2 ecosystem — todos os serviços RS Prólipsi
 * Ajuste os paths (cwd) conforme a sua estrutura em produção.
 */

module.exports = {
  apps: [
    // Raiz (Next.js) — rsprolipsi.com.br → 3000
    {
      name: 'raiz',
      cwd: '/home/rsprolipsi/apps/raiz',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: { NODE_ENV: 'production' }
    },

    // Admin (Next.js) — admin.rsprolipsi.com.br → 3001
    {
      name: 'admin',
      cwd: '/home/rsprolipsi/apps/admin',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      env: { NODE_ENV: 'production' }
    },

    // Escritório (Next.js) — escritorio.rsprolipsi.com.br → 3002
    {
      name: 'escritorio',
      cwd: '/home/rsprolipsi/apps/escritorio',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3002',
      env: { NODE_ENV: 'production' }
    },

    // API (NestJS) — api.rsprolipsi.com.br → 3003
    {
      name: 'api',
      cwd: '/home/rsprolipsi/apps/api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        DATABASE_URL: 'COLOQUE_SUA_URL_AQUI'
      }
    },

    // RSSHOP (Next.js) — rsshop.rsprolipsi.com.br → 3004
    {
      name: 'rsshop',
      cwd: '/home/rsprolipsi/apps/rsshop',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3004',
      env: { NODE_ENV: 'production' }
    },

    // RSWalletPay (NestJS) — rswalletpay.rsprolipsi.com.br → 3005
    {
      name: 'rswalletpay',
      cwd: '/home/rsprolipsi/apps/rswalletpay',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        DATABASE_URL: 'COLOQUE_SUA_URL_AQUI'
      }
    },

    // RSIA (Express) — rsia.rsprolipsi.com.br → 3006
    {
      name: 'rsia',
      cwd: '/home/rsprolipsi/apps/rsia/api',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3006,
        OPENAI_API_KEY: 'sk-COLOQUE_AQUI'
      }
    }
  ]
};

