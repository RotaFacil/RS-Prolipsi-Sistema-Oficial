# CRP – Admin RS Prólipsi

Versão: 1.0
Data: 2025‑09‑21
Escopo: Documentar 100% do que foi estruturado no painel administrativo (frontend) — pastas, arquivos, rotas, componentes, estilo, deploy, comandos e padrões. Serve de referência para manutenção/evolução e como base para o painel do consultor.

---

## 1) Visão geral do projeto

- Stack: React 18 + Vite, React Router, TailwindCSS, PostCSS.
- Runtime/Orquestração: PM2 (Node), Nginx (reverse proxy) — subdomínio `admin.rsprolipsi.com`.
- Tema/UI: dark (preto/antracito) com acentos dourados (#FFD700).
- Código: componentes funcionais, lazy‑loading por rota, alias `@` → `src`.
- Pasta raiz (servidor): `/srv/rsprolipsi/admin-panel`.

---

## 2) Estrutura de diretórios (frontend)

```
/srv/rsprolipsi/admin-panel
├─ dist/
├─ node_modules/
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ vite.config.js
├─ index.html
└─ src/
   ├─ index.css
   ├─ main.jsx
   ├─ App.jsx
   ├─ routes/adminRoutes.jsx
   ├─ components/
   │  ├─ FeaturePage.jsx
   │  └─ sigma/{MatrixCard.jsx, LevelBar.jsx}
   ├─ pages/
   │  ├─ sigme/{MatrixSigma.jsx, CicloUniversal.jsx, CareerPins.jsx, TopSigme.jsx, TablesPerc.jsx, MarketplaceBonus.jsx, SigmeReports.jsx}
   │  ├─ shop/{Products.jsx, Orders.jsx, Marketplace.jsx, Dropshipping.jsx, Distribution.jsx, Affiliates.jsx, ShopReports.jsx, Site.jsx}
   │  ├─ wallet/{Balances.jsx, Subscriptions.jsx, Transfers.jsx, Recurrence.jsx, WalletSettings.jsx}
   │  └─ reports/{GeneralReport.jsx, ScoreReport.jsx, ActivationReport.jsx}
   └─ services/api.js
```

---

## 3) Configurações de build/estilo

- tailwind.config.cjs: `content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]`.
- postcss.config.cjs: `{ plugins: { "@tailwindcss/postcss": {} } }`.
- index.css: diretivas Tailwind e ajustes globais (ex.: `:root { --rs-accent: #ffd700 }`).
- vite.config.js: alias `@` para `src`.

---

## 4) Entrada do app e layout

- main.jsx: `<BrowserRouter><App/></BrowserRouter>`.
- App.jsx: Sidebar (objeto `MENUS`), Topbar, `<Routes>` renderizando `adminRoutes`.
- MENUS principais: Dashboard; Configurações SIGME (matriz/ciclo/pins/top/tabelas/bonus/relatórios); RS Shop (produtos/pedidos/marketplace/dropshipping/distribuição/afiliados/relatórios/site); RS Wallet Pay; Relatórios.

---

## 5) Tabela de rotas (lazy)

- SIGME: `/sigme/matriz`, `/sigme/ciclo`, `/sigme/carreira-pins`, `/sigme/top`, `/sigme/tabelas`, `/sigme/bonus-market`, `/sigme/relatorios`.
- SHOP: `/shop/produtos`, `/shop/pedidos`, `/shop/marketplace`, `/shop/dropshipping`, `/shop/distribuicao`, `/shop/afiliados`, `/shop/relatorios`, `/shop/site`.
- WALLET: `/wallet/saldos`, `/wallet/assinaturas`, `/wallet/transferencias`, `/wallet/recorrencias`, `/wallet/config`.
- REPORTS: `/relatorios/geral`, `/relatorios/pontuacao`, `/relatorios/ativacao`.

---

## 6) Componentes e páginas principais

- FeaturePage.jsx: wrapper com título e conteúdo.
- CicloUniversal.jsx: configura "eu + 6 diretos" (ativos L1, consumo R$, bônus %, pct consultor %, diretos mínimos, reentrada auto).
- MatrixSigma.jsx: define matrizes com consumo/diretos mínimos/pontos (%) e distribuição L1..L5 com barra de soma (100%).
- CareerPins.jsx: define PINs (nome, diretos mínimos, alvo de ciclos L1‑L3, janela dias, consumo base, pontos %, níveis=3, logo, observações).
- Shop › Site.jsx: configuração inicial do site/vitrine (stub).

---

## 7) Navegação x Conteúdo

1) `MENUS` define labels e `to`. 2) `adminRoutes.jsx` exporta `{ path, element }` (lazy import). 3) `App.jsx` monta Sidebar + Topbar + Routes. 4) Clique no menu → componente é carregado lazily. 5) Placeholders antigos foram removidos.

---

## 8) Integração (API / Supabase)

- `src/services/api.js` (stub). Uso recomendado: `export default api` e `import api from "@/services/api"`.
- Tabelas sugeridas (Supabase):
  - `sigme_cycles_config` (ciclo universal, campos de configuração).
  - `sigme_matrix` (matrizes e L1..L5 %).
  - `sigme_career_pins` (PINs, metas e janela).
- Endpoints sugeridos: `/api/sigme/cycle`, `/api/sigme/matrix`, `/api/sigme/pins` (GET/PUT).

---

## 9) Estilo / UI

- Cores: fundo preto; containers `bg-zinc-950/90`; bordas `border-yellow-400/20`; títulos `text-yellow-400`.
- Cards: `rounded-2xl`, `ring-1 ring-yellow-400/10`.
- Inputs: `rounded-xl` com foco dourado.
- Responsividade: grids 1/2/3 colunas conforme viewport.

---

## 10) Build, publicação e recuperação

- Scripts (exemplo): `dev: vite`, `build: vite build`, `preview: vite preview --port 3001`.
- PM2: rodar `vite preview` em 3001 com nome `admin`. Nginx proxia `admin.rsprolipsi.com` → `http://127.0.0.1:3001`.
- Comandos úteis: `pm2 restart admin`, `pm2 logs admin --lines 50`, `pm2 save`.
- Nginx: `nginx -t && systemctl reload nginx`.

---

## 11) Nova página (passo a passo)

1) Criar `src/pages/<area>/<Nome>.jsx` (default export). 2) Adicionar rota em `src/routes/adminRoutes.jsx`. 3) Incluir no `MENUS` do `App.jsx`. 4) (Opcional) endpoints e tabelas. 5) `npm run build` + `pm2 restart admin`.

---

## 12) Alinhado x Pendente

- Alinhado: rotas/menu; Ciclo Universal; Matriz Sigma; Carreira/PINs; Shop › Site.
- Pendente: persistência real (Supabase), upload de logo, profundidade 8, validações %, migração da mesma UX para o painel do consultor, automação SSL.

---

## 13) Snippets úteis

- FeaturePage.jsx (exemplo):
  `<div class="p-6"><h1 class="text-xl font-bold text-yellow-400 mb-4">{title}</h1><div class="bg-zinc-950/80 rounded-2xl ring-1 ring-yellow-400/10 p-4">{children}</div></div>`
- Rota lazy: `const MatrixSigma = lazy(()=>import('@/pages/sigme/MatrixSigma'));` → `[{ path: '/sigme/matriz', element: <MatrixSigma/> }]`.
- Chamada API (stub): `const r = await api.get('/api/sigme/matrix');`.

---

## 14) Operação

- Projeto: `/srv/rsprolipsi/admin-panel`
- Restart: `pm2 restart admin`
- Recuperação: `rs-up`
- Logs: `pm2 logs admin --lines 100`

> Atualize este CRP sempre que novas rotas/telas/estruturas forem incluídas.

