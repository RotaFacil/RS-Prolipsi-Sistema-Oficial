# CRP — RS Prólipsi • IA (porta 3006)

Versão: 1.0  
Ambiente alvo: Ubuntu + Node 18+ + PM2 + Nginx (HTTPS)  
App: Servidor Express (TS → JS) + UI estática (preto + dourado)  
Objetivo: Documentar o necessário para colocar o app no ar: estrutura de pastas, variáveis de ambiente, PM2, Nginx/HTTPS, rotas, cURLs e checklist.

---

## 1) Estrutura de pastas (produção sugerida)

```
/home/rsprolipsi/apps/rsia/
├─ api/                     # código Node/Express compilado (dist/index.js)
│  ├─ public/               # UI estática do painel (preto + dourado)
│  │  └─ assets/
│  │     ├─ rs-logo.png
│  │     └─ avatar-default.svg
│  ├─ .env                  # (opcional; se usar PM2 env, pode omitir)
│  ├─ dist/                 # saída do build TypeScript
│  │  └─ index.js           # servidor Express
│  └─ src/                  # fontes (TypeScript)
├─ ecosystem.config.js      # PM2
└─ logs/                    # logs do app (se necessário)
```

Notas
- No repositório atual, o código vive em `apps/rsia/src`. Em produção, rode `npm run build` e publique `apps/rsia/dist` (ou copie apenas o conteúdo de `dist/` + `public/`).
- O servidor serve `public/index.html` e expõe APIs JSON.

---

## 2) Variáveis de ambiente (ENV)

Essenciais (defina no PM2 ou em `.env` no diretório `api/`):

```
PORT=3006
OPENAI_API_KEY=sk-...            # chave OpenAI (obrigatória para subir)
# STATIC_ROOT (opcional)         # diretório de arquivos estáticos (default: dist/public)
```

Observações
- O servidor não inicia sem `OPENAI_API_KEY` (verificação em bootstrap).
- A UI usa tema preto com dourado (lovable.dev-like), já inclusa em `src/public/index.html`.

---

## 3) PM2 — ecosystem.config.js

Crie em `/home/rsprolipsi/apps/rsia/ecosystem.config.js`:

```js
module.exports = {
  apps: [
    {
      name: 'rsia',
      cwd: '/home/rsprolipsi/apps/rsia/api',
      script: 'dist/index.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        PORT: 3006,
        OPENAI_API_KEY: 'sk-COLOQUE_AQUI',
        // STATIC_ROOT: '/home/rsprolipsi/apps/rsia/api/dist/public' // opcional
      }
    }
  ]
}
```

Comandos PM2

```
cd /home/rsprolipsi/apps/rsia
pm2 start ecosystem.config.js
pm2 restart rsia --update-env
pm2 logs rsia -n 100
pm2 save
```

---

## 4) Build e execução

No host de produção (Node 18+):

```
# Dentro do repositório, na raiz do monorepo
npm i
npm run build --workspace @rsprolipsi/rsia

# Opcional: copiar para /home/rsprolipsi/apps/rsia/api
# - dist/ (build gerado)
# - public/ (UI)
# - ecosystem.config.js (arquivo acima)

# PM2 conforme seção 3
```

Dev local

```
npm run dev --workspace @rsprolipsi/rsia
# Abre em http://localhost:3006
```

---

## 5) Nginx (HTTPS) — proxy para porta 3006

`/etc/nginx/sites-available/rsia.conf`:

```nginx
server {
  listen 80; listen [::]:80;
  server_name ia.seu-dominio.com.br;
  location /.well-known/acme-challenge/ { root /var/www/html; }
  location / { return 301 https://$host$request_uri; }
}

server {
  listen 443 ssl http2; listen [::]:443 ssl http2;
  server_name ia.seu-dominio.com.br;

  ssl_certificate     /etc/letsencrypt/live/ia.seu-dominio.com.br/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/ia.seu-dominio.com.br/privkey.pem;

  client_max_body_size 10m;
  gzip on; gzip_types text/plain application/json text/css application/javascript;

  location / {
    proxy_pass http://127.0.0.1:3006;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Certbot

```
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ia.seu-dominio.com.br
systemctl reload nginx
```

---

## 6) Rotas HTTP expostas

Públicas
- `GET /health` → `{ status: "ok", service: "rsia", timestamp }`
- `GET /` → UI estática (index.html)
- `GET /assets/...` → arquivos estáticos

CRUD (dev, in-memory) — Assistants
- `GET /api/assistants` → lista
- `POST /api/assistants` → cria `{ name, description?, model, status }`
- `GET /api/assistants/:id` → detalha
- `PUT /api/assistants/:id` → atualiza
- `DELETE /api/assistants/:id` → remove

Notas
- Essas rotas utilizam store em memória, pensadas para desenvolvimento. Em produção, substitua por persistência real (DB/Supabase) se necessário.

---

## 7) cURLs de validação

```
# Health
curl -s http://127.0.0.1:3006/health | jq

# Listar assistants
curl -s http://127.0.0.1:3006/api/assistants | jq

# Criar assistant
curl -s -X POST http://127.0.0.1:3006/api/assistants \
  -H 'Content-Type: application/json' \
  -d '{"name":"Atendimento Padrão","model":"gpt-4o-mini","status":"active"}' | jq

# Editar (trocar :id)
curl -s -X PUT http://127.0.0.1:3006/api/assistants/:id \
  -H 'Content-Type: application/json' \
  -d '{"name":"Novo nome"}' | jq

# Excluir
curl -s -X DELETE http://127.0.0.1:3006/api/assistants/:id | jq
```

---

## 8) Segurança & operação

- `OPENAI_API_KEY` é obrigatório e não deve ir para o Git.
- Limite de corpo padrão (JSON) é baixo; ajuste no Nginx se precisar.
- Logs: acompanhe via `pm2 logs rsia -n 100`.
- UI: está em `apps/rsia/src/public/index.html` (tema preto + dourado).

---

## 9) Checklist de subida (do zero ao ar)

1) Buildar app
```
npm i
npm run build --workspace @rsprolipsi/rsia
```
2) Preparar pasta de produção
```
mkdir -p /home/rsprolipsi/apps/rsia/api
# copie dist/ e public/ para /home/rsprolipsi/apps/rsia/api
# copie ecosystem.config.js para /home/rsprolipsi/apps/rsia
```
3) PM2 com ENV reais
```
pm2 start /home/rsprolipsi/apps/rsia/ecosystem.config.js
pm2 save
```
4) Nginx + HTTPS
```
# conforme seção 5
```
5) Testes rápidos
```
curl -s https://ia.seu-dominio.com.br/health | jq
curl -s https://ia.seu-dominio.com.br/api/assistants | jq
```

---

## 10) Próximos passos (opcionais)

- Persistência real (DB/Supabase) para assistants.
- Painel admin dedicado para gerenciar items (substituir prompt de edição).
- Autenticação/RBAC se publicar APIs.
- Rate limit (express-rate-limit) para proteger endpoints públicos.

---

Referências de código (repo)
- Servidor: `apps/rsia/src/index.ts`
- Store (dev): `apps/rsia/src/store.ts`
- UI estática: `apps/rsia/src/public/index.html`
