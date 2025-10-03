/**
 * PM2 ecosystem config — RSIA (Express)
 * Ajuste os valores e copie este arquivo para o servidor de produção.
 */

module.exports = {
  apps: [
    {
      name: 'rsia',
      cwd: process.env.RSIA_CWD || '/home/rsprolipsi/apps/rsia/api',
      script: process.env.RSIA_SCRIPT || 'dist/index.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: Number(process.env.PORT || 3006),
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'sk-COLOQUE_AQUI',
        // STATIC_ROOT: '/home/rsprolipsi/apps/rsia/api/dist/public', // opcional
        // SUPABASE_URL: '',
        // SUPABASE_SERVICE_ROLE_KEY: '',
        // SUPABASE_REF: 'rsprolipsi',
        // SUPABASE_PAT: ''
      }
    }
  ]
};

