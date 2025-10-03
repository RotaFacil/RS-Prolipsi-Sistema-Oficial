# CRD • RS Prólipsi – Escritórios Admin e Consultor

## 0) Visão Geral

- Dois apps separados (distintos e completos):
  - Admin Panel (já existe; manter como referência de tema e UX).
  - Consultor Panel (app independente; login e cadastro próprios).
- Stack base (ambos): React 18 + Vite 5, React Router 6 (HashRouter), CSS utilitário leve + tokens (tema dark + dourado), lazy loading, PM2 + Nginx.
- Tema/UX: Sidebar com acordeão (fechado por padrão), cartões/cápsulas arredondados, borda dourada, contraste alto, tipografia forte.
- Roteamento: HashRouter para evitar rewrite de Nginx; cada item do menu navega para `#/path`.
- Dados: Consumo via fetch através de `services/api.js` (export nomeado `{ api }`), com `VITE_API_URL` e JWT no `Authorization`.

---

## 1) Separação total entre Admin e Consultor

### 1.1 Domínios/Processos

- Admin: `admin.rsprolipsi.com` → processo PM2 `admin`, porta interna específica já configurada.
- Consultor: `escritorio.rsprolipsi.com` → processo PM2 `escritorio`, porta 3002, servido por `pm2 serve dist 3002 --spa`.

### 1.2 Autenticação e Cadastro (Desvinculados)

- Fluxos do Consultor:
  - `/login`: e-mail/telefone + senha → JWT (escopo `consultant`).
  - `/signup`: cadastro simples (nome, e-mail, telefone, senha, aceite LGPD).
  - `/forgot`: recuperação de senha.
- Fluxos do Admin: seguem como já existentes (escopo `admin`).
- Regra: tokens não são intercambiáveis; RLS no backend deve verificar `role` e `user_id`.

---

## 2) Design System (cores, tipografia, componentes)

### 2.1 Tokens (CSS custom properties)

```
--bg:#0f1115;           /* fundo global */
--panel:#151922;        /* cartões/painéis */
--line:#b89b4f;         /* dourado linhas/bordas */
--text:#e7e2d9;         /* texto principal */
--muted:#a79a87;        /* texto secundário */
--accent:#c8a959;       /* acento/hover/destaque */
--chip:#242937;         /* cápsulas/tags */
--radius:14px;          /* raio global */
```

### 2.2 Tipografia

- Títulos: peso 800, espaçamento 0.5px, tamanhos: H1 34px, H2 22px, H3 18px.
- Texto: 16px/1.4; pequenos rótulos 14px.

### 2.3 Componentes de base (comportamento e estados)

- Button (`.btn`)
  - Normal, `:hover` (leve brilho), `:disabled` (opacidade 0.6, cursor default).
  - Ícones opcionais à esquerda (unicode ou lib leve).
- Card (`.card`/`.section`)
  - Fundo `--panel`, borda 1px `--line` com transparência 35%, `border-radius: var(--radius)`, padding 14–18px.
- Chip (`.chip`)
  - Cápsula para filtros/abas horizontais (“Ciclo Universal”, “Plano de Carreira”, etc.).
- Sidebar + Accordion
  - Cabeçalho (`.acc-head`) clicável com seta ▸/▾.
  - Default: fechado.
  - Abertura múltipla.
  - Itens (`.nav-item`) mudam `active` por hash atual.

---

## 3) Estrutura de pastas (idêntica entre apps, com conteúdos específicos)

```
/srv/rsprolipsi/<app>
  index.html
  vite.config.js
  .env                  # VITE_API_URL
  /src
    main.jsx
    App.jsx
    /styles   theme.css
    /components {Sidebar.jsx, FeaturePage.jsx, Button.jsx(opcional)}
    /services  api.js   # export { api }
    /routes    routes.jsx
    /pages
      /dashboard   Dashboard.jsx
      /sigme       {CicloUniversal.jsx, PlanoCarreira.jsx, PlanoDrop.jsx, Consulta.jsx}
      /shop        {Products.jsx, Orders.jsx, Marketplace.jsx, Dropshipping.jsx, Distribution.jsx, Affiliates.jsx, ShopReports.jsx, Site.jsx}
      /wallet      {Balances.jsx, Transfers.jsx, Subscriptions.jsx, Recurrence.jsx, WalletSettings.jsx}
      /reports     {GeneralReport.jsx, ScoreReport.jsx, ActivationReport.jsx}
      /config      {Profile.jsx, Security.jsx, Preferences.jsx}
      /auth        {Login.jsx, Signup.jsx, Forgot.jsx}      # somente Consultor
```

- Admin mantém suas páginas específicas (Configurações SIGME globais, Tabelas, PINs, Rankings etc.).
- Consultor contém `/auth` e não renderiza páginas globais (somente leitura da config SIGME).

---

## 4) Roteamento (HashRouter) e navegação

### 4.1 Base (ambos)

- Implementar em `App.jsx`:
  - `<HashRouter>` + layout `.layout` com `<Sidebar/>` fixo.
  - `<Routes>` com `lazy()` para todas as páginas.
  - Rota coringa → `#/sigme/ciclo`.

### 4.2 Padrões de URL (Consultor)

- `#/` → Dashboard
- `#/sigme/ciclo`, `#/sigme/plano`, `#/sigme/drop`, `#/sigme/consulta`
- `#/shop/produtos`, `#/shop/pedidos`, `#/shop/marketplace`, `#/shop/dropshipping`, `#/shop/distribuicao`, `#/shop/afiliados`, `#/shop/relatorios`, `#/shop/site`
- `#/wallet/saldos`, `#/wallet/transferencias`, `#/wallet/assinaturas`, `#/wallet/recorrencias`, `#/wallet/config`
- `#/relatorios/geral`, `#/relatorios/pontuacao`, `#/relatorios/ativacao`
- `#/config/perfil`, `#/config/seguranca`, `#/config/preferencias`
- `#/auth/login`, `#/auth/signup`, `#/auth/forgot` (Consultor)

### 4.3 Sem duplicação de “título dentro do título”

- Evitar mini-header extra dentro da página que replique o título do layout. O H1 é único (de `FeaturePage`).

---

## 5) Autenticação, Autorização e Estado

### 5.1 Consultor

- Login → POST `/api/auth/login` → `{ token, user }`.
- Signup → POST `/api/auth/signup` → cria usuário `role=consultant`.
- Persistência: `localStorage.token`.
- Guarda de rota: se não autenticado, redirecionar `#/auth/login`.
- Logout: limpar token; voltar ao `#/auth/login`.

### 5.2 Admin

- Mantém fluxo atual; checagem de escopo `admin` no backend.

---

## 6) Módulos chave (front + contratos)

### 6.1 SIGME – Consultor (Ciclo Universal)

UI
- Top chips: `Ciclo Universal`, `Plano de Carreira`, `Plano Dropship`, `Consulta`.
- Seções lado a lado:
  - Configuração Global (somente leitura):
    - GET `/api/sigma/ciclo` → `{ ativosL1, consumoPessoa, bonusPct, consultorPct, profundidade, diretosMin, reentradaAuto }`
  - Status do Consultor:
    - GET `/api/user/ciclo/status` → `{ consumoOk, diretosAtivos, diretosMin, podeCiclar, faltamDiretos, faltamConsumos }`
- Preferências (pessoais):
  - GET/POST `/api/user/ciclo/preferences` → `{ reentradaAuto: boolean }`
- Ações:
  - POST `/api/user/ciclo/entrar`  Body `{ origem: "manual"|"auto" }`
  - POST `/api/user/ciclo/ciclar`   Res `{ bonusPool, consultorValor, reciboId }`

Matriz Spillover 6 (opcional V1)
- Regra: “eu + 6 diretos”, preenchimento em largura (BFS).
- Tamanho por geração: G0=1, G1=6, G2=36, G3=216.
- Progresso (“reloginhos”): GET `/api/user/ciclo/tree/progress` → `{ g1, g2, g3 }`.
- Cálculo de ganhos (preview): GET `/api/user/ciclo/earnings/preview` → `{ g1Valor, g2Valor, g3Valor, total }`.
- Algoritmo BFS (pseudo):
```
queue = [root]
while queue not empty:
  n = queue.pop(0)
  if n.children < 6: placeHere(n); break
  else queue.extend(n.childrenSortedLeftToRight)
```
- Estados de botão:
  - “Ativar entrada (R$ 60,00)” → sempre habilitado.
  - “Ciclar agora” → habilitar quando `podeCiclar = true`.

### 6.2 Plano de Carreira / PINs (Consultor)

- V1 read-only: GET `/api/user/career` → níveis atingidos, PIN atual.

### 6.3 RS Shopping (Consultor)

- Páginas: Produtos, Pedidos, Marketplace, Dropshipping, Centro de Distribuição, Afiliados, Relatórios, Site do Consultor.
- Site do Consultor:
  - GET/PUT `/api/user/site-config` → tema, cores, logo, vitrine (SKUs), slug.
  - POST `/api/user/site-publish` → publica/gera CDN/rota.

### 6.4 Wallet (Consultor)

- GET `/api/wallet/balance` → `{ available, pending }`
- GET `/api/wallet/extract?from&to`
- POST `/api/wallet/transfer`, POST `/api/wallet/cashout`
- Assinaturas/Recorrência: listar/criar/cancelar.

### 6.5 Relatórios (Consultor)

- Geral / Pontuação / Ativação – filtros simples, export CSV.

### 6.6 Admin – SIGME Global (referência)

- CRUD de parâmetros: `ativosL1, consumoPessoa, bonusPct, consultorPct, profundidade, diretosMin, reentradaAuto`.
- Páginas adicionais: Matriz Sigma (várias matrizes por aba), Tabelas/Percentuais, PINs, Rankings, Marketplace Boni.

---

## 7) Sidebar/Accordion – Especificação detalhada

- Grupos:
  - Painel (Dashboard)
  - Sistema SIGME (Ciclo Universal, Plano de Carreira, Plano Dropship, Consulta)
  - RS Shopping (subitens)
  - RS Wallet Pay (subitens)
  - Relatórios (subitens)
  - Configurações (Perfil, Segurança, Preferências)
- Fechado por padrão; persistência opcional em `localStorage.sidebarOpen`.
- Item ativo: comparar `location.hash` com `to`.
- Acessibilidade: cabeçalho `<button>` com `aria-expanded`, setas ▸/▾ com `aria-hidden`.

---

## 8) Padrões de UI específicos

- Sem divisores verticais centrais; apenas `border-right` na sidebar.
- Evitar títulos duplicados.
- Dashboard: 3 a 6 cards responsivos (grid 3 col no desktop).

---

## 9) Serviço de API (front)

```js
// src/services/api.js
const base = (path) => path.startsWith("http") ? path : (import.meta.env.VITE_API_URL + path);
async function request(method, url, body){
  const h={ "Content-Type":"application/json" };
  const t=localStorage.getItem("token"); if(t) h.Authorization=`Bearer ${t}`;
  const r=await fetch(base(url),{method,headers:h,body:body?JSON.stringify(body):undefined});
  if(!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.status===204?null:r.json();
}
export const api={ get:(u)=>request("GET",u), post:(u,b)=>request("POST",u,b), put:(u,b)=>request("PUT",u,b), del:(u)=>request("DELETE",u) };
```

- Export nomeado `{ api }` (não default).

---

## 10) Deploy/Infra

- Build: `npm run build` gera `dist/`.
- Serviço: `pm2 serve /srv/rsprolipsi/<app>/dist 3002 --name escritorio --spa` (para Consultor).
- Nginx vhost `escritorio.rsprolipsi.com`:

```
location / { proxy_pass http://127.0.0.1:3002; }
```

- Controle:
  - `pm2 restart escritorio --update-env`
  - `curl -I http://127.0.0.1:3002/` → 200.

---

## 11) Qualidade, Performance e TelemetRIA

- Lazy + Suspense em todas as páginas.
- Evitar aliases de import até estabilizar a config do Vite.
- Interceptar `window.onerror` → `/api/logs/client`.
- Loading states visíveis (botões/skeletons).

---

## 12) Acessibilidade e i18n

- Contraste AA (tema dark).
- `aria-label` em botões icônicos e cabeçalhos do acordeão.
- Strings em pt-BR, estruturadas para futura extração.

---

## 13) Testes e Aceite (UAT)

- Sidebar
  - [ ] Grupos abrem/fecham.
  - [ ] Rota ativa destacada.
- Roteamento
  - [ ] `#/sigme/ciclo` carrega sem headers duplicados.
- SIGME – Consultor
  - [ ] Preferência Reentrada automática persiste.
  - [ ] “Ativar entrada” / “Ciclar agora” com feedback.
  - [ ] Relógios G1/G2/G3 conforme backend.
- Autenticação – Consultor
  - [ ] Login requerido; signup navega ao Dashboard.
- Navegação Shop/Wallet/Reports/Config
  - [ ] Placeholders carregam.
- Deploy
  - [ ] `curl -I 127.0.0.1:3002` → 200.
  - [ ] Nginx / HTTPS ok.

---

## 14) Roadmap curto

1. Completar SIGME Spillover (árvore + gauges e preview de ganhos).
2. Wallet (extratos reais) e Shop (produtos/pedidos).
3. Site do Consultor com preview e publicação.

---

## 15) Glossário rápido

- Spillover 6: árvore de grau 6, preenchida em largura.
- Gerações: G0 (1), G1 (6), G2 (36), G3 (216).
- Pool do ciclo: % da L1 do grupo; `consultorPct` define repasse ao ciclar.
- Acordeão: menu colapsável na sidebar.
- Chips: abas horizontais de contexto.

---

Observação: este CRD consolida nomes de pastas, módulos, rotas, tema e contratos. Usa HashRouter, lazy sem alias, pm2 serve na 3002 e `api` export nomeado.
