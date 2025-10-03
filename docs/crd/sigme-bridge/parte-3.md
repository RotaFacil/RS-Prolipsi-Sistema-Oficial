# CRD – SIGME Bridge & Conectores + Ads (Parte 3/3) – completo + wireframes (ASCII) – v1.0 

Tema: **preto & dourado**. **Base documental**: RS Shop/Drop/Marketplace, RS Wallet/Pay, PRD SIGME, Mapa do Ecossistema.

> Escopo: **SIGME Bridge** (pontuação unificada, simulação→efetivo), **Connector Hub** (marketplaces/parceiros), **Ads/Destaques** (leilão, slots, relatórios) e **Atribuição Avançada** (links/UTM/QR/WA, pixels, último clique). Onde houver regra comercial (percentuais, janelas, políticas) marcar **(validar)**.

---

## 1) Visão & Objetivos

* **Unificar a pontuação** de todas as vendas (Shop/Drop/Marketplace/Afiliado/Digital/Grupo) via **eventos** oriundos do **Wallet/Pay**.
* **Ligar/Desligar** regras de pontuação no Admin, com **Simulação** antes de impactar a rede (SIGME).
* **Conectar** catálogos/pedidos externos (marketplaces/parceiros) com confiabilidade (fila/retry, auditoria, reconciliação).
* **Monetizar vitrine** com **Ads/Destaques** (CPC/CPM/Agenda), mantendo moderação, relatórios e cobrança pela Wallet.
* **Rastrear origem** das vendas com atribuição **last‑click** e consentimento LGPD para pixels.

---

## 2) Módulos & Menus (Admin)

```
TOPBAR: ☰ Apps  RS • Admin • Wallet • Shop • IA • Marketplace | Buscar | Ajuda | 🔔 | 👤
SIDEBAR (Admin):
  SIGME Bridge ▸ Eventos | Regras | Simulação | Aplicar | Logs
  Connector Hub ▸ Parceiros | Adapters | Mapeamentos | Filas | Auditoria
  Ads & Destaques ▸ Slots | Campanhas | Creatives | Orçamento | Relatórios
  Atribuição ▸ Links/Short/QR/WA | Cliques | Janela | Pixels | Relatórios
  Moderação ▸ Conteúdos | Sellers | Produtos | Anúncios | Reclamações
  Relatórios ▸ Pontos/Unidades | Vendas por Origem | Ads Perf | Conectores
  Configurações ▸ LGPD/Consent | Segurança/Perfis | Webhooks | API Keys
```

---

## 3) Fluxos (alto nível)

```
VENDA (Wallet → Ledger) ─→ SIGME Bridge: SCORE_EVENT(simulado|efetivo) ─→ SIGME
CONNECTOR (API externa) ─→ Fila/Retry ─→ Catálogo/Pedidos locais ─→ Vendas/Wallet
ADS (campanha) ─→ Leilão/Agenda ─→ Exibição na vitrine/lista ─→ Cliques/Conversões ─→ Cobrança Wallet
ATRIBUIÇÃO (links/pixels) ─→ Clickstream ─→ Pedido (last-click) ─→ Relatórios & Split
```

---

## 4) Telas & Wireframes (ASCII)

### 4.1 SIGME Bridge

```
┌ Regras ─────────────────────────────────────────────────────────────┐
│ Tabela (v3): unidades por R$ (por origem) *(validar)*               │
│ Janela de pontuação: ( ) venda ( ) liquidação ( ) entrega *(validar)*│
│ [Simular] [Publicar v4]  [Histórico de mudanças]                    │
└──────────────────────────────────────────────────────────────────────┘
┌ Simulação ──────────────────────────────────────────────────────────┐
│ Período: __ a __ | Origem: SHOP/DROP/MKT/AFIL/DIG/GRUPO             │
│ Resultado: +12.340 unidades | Impacto por nível | Top eventos       │
│ [Gerar CSV]  [Aplicar regra]  (gera efetivo a partir de agora)      │
└──────────────────────────────────────────────────────────────────────┘
┌ Eventos & Logs ─────────────────────────────────────────────────────┐
│ id  ts        origem  ref        units  status(sim|efet)  actor      │
│ e1  10:31     SHOP    order#123  10     sim               system     │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.2 Connector Hub

```
┌ Parceiros ──────────────────────────────────────────────────────────┐
│ Shopee [Conectar]  Amazon [Conectar]  ERP X [Conectar]  …           │
└──────────────────────────────────────────────────────────────────────┘
┌ Adapters & Mapeamentos ─────────────────────────────────────────────┐
│ Adapter: Shopee  |  Mapeamento: Categoria    Marca    Atributos     │
│ [Testar credenciais] [Salvar]                                       │
└──────────────────────────────────────────────────────────────────────┘
┌ Filas & Auditoria ──────────────────────────────────────────────────┐
│ job#77 import produtos  OK   10:31 | job#81 pedidos  RETRY (x3)     │
│ [Reprocessar] [Ver payload] [Ignorar]                                │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.3 Ads & Destaques

```
┌ Slots ──────────────────────────────────────────────────────────────┐
│ Home: banner_top(3), grid_card(8)  |  Lista: inline_card(6)         │
│ [Editar slot] [Criar campanha]                                       │
└──────────────────────────────────────────────────────────────────────┘
┌ Campanha ───────────────────────────────────────────────────────────┐
│ Nome [Lançamento X]  Modelo: ( ) CPC ( ) CPM  *(validar)*           │
│ Orçamento [R$____]  Agenda [__/__/__ a __/__/__]  Segmentos [ ]     │
│ Creative: [upload]  Destino: (produto|categoria|loja|URL)           │
│ Cobrança: Wallet (conta anunciante)                                 │
│ [Ativar] [Pausar] [Relatório]                                        │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.4 Atribuição Avançada

```
┌ Links & Short/QR/WA ────────────────────────────────────────────────┐
│ Destino [URL/Produto/Categoria]  UTM  [Gerar] [Short] [QR] [WA]     │
└──────────────────────────────────────────────────────────────────────┘
┌ Cliques & Janela ───────────────────────────────────────────────────┐
│ Janela: 7/14/30 dias *(validar)*  |  Regra: last-click              │
│ Tabela: click_id  ts  source  medium  campaign  ref  pedido_id      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5) APIs & Eventos (MVP)

**SIGME Bridge**

* `POST /api/sigme/rules/publish` → publica versão vN (unidades por R$ por origem/níveis) *(validar)*
* `POST /api/sigme/rules/simulate` → retorna unidades previstas por período/origem.
* `POST /api/sigme/events` → grava `score_event {origin, units, simulated|effective, ref}`.
* `POST /api/sigme/toggle` → liga/desliga aplicação **efetiva**.

**Connector Hub**

* `POST /api/connectors/{partner}/auth` → salva credenciais seguras.
* `POST /api/connectors/{partner}/import/products|orders` → importa lote (fila).
* Webhooks externos: `partner.product.updated`, `partner.order.created` → caem na fila.

**Ads**

* `POST /api/ads/slots` | `GET /api/ads/slots`
* `POST /api/ads/campaigns` (cpc|cpm, budget, agenda, segmentos)
* `POST /api/ads/impression` | `POST /api/ads/click` → metragens idempotentes.

**Atribuição**

* `POST /api/links/short` | `/qr` | `/wa`
* `POST /api/attribution/click` → registra clique (UTM/ref/ip/device) com consentimento
* `POST /api/attribution/apply` → aplica last‑click ao `pedido_id` (job noturno ou síncrono).

---

## 6) Modelo de Dados (alto nível)

* **Pontuação (SIGME)**: `sigme_rules(id, version, origin, units_per_brl, level_map, active)` • `sigme_score_events(id, origin, units, simulated, ref_type, ref_id, created_at)` • `sigme_logs`.
* **Conectores**: `connectors(id, partner, status)` • `connector_auth(id, connector_id, enc_creds)` • `connector_jobs(id, type, status, retries, last_error)` • `connector_maps(id, kind, map)` • `external_products(id, partner, external_id, map)` • `external_orders(id, partner, external_id, map)`.
* **Ads**: `ad_slots(id, key, placement, size, constraints)` • `ad_campaigns(id, slot_id, model, budget, start_at, end_at, targeting, status)` • `ad_creatives(id, campaign_id, meta)` • `ad_impressions(id, campaign_id, ts, ref)` • `ad_clicks(id, campaign_id, ts, ref)` • `ad_spend(id, campaign_id, amount, ts)`.
* **Atribuição**: `short_links(id, owner_id, long_url, utm, qr_code, wa_template)` • `attribution_clicks(id, ts, source, medium, campaign, ref, device, ip_hash, consent)` • `attribution_applied(id, order_id, click_id, applied_at)`.
* **Auditoria**: `audit_logs(id, actor, action, entity, entity_id, before, after, ts)`.

---

## 7) Critérios de Aceite (MVP)

1. **SIGME**: com regra **desligada**, 3 vendas (Shop/Drop/Digital) geram `score_events` **simulados**; ao **publicar vN** e **ligar**, novas vendas passam a gerar **efetivo**; relatório mostra diferença sim vs efetivo.
2. **Connector**: importar 100 SKUs do parceiro → 95+ criados/atualizados; 1 pedido externo conciliado D+0; fila registra **retry** e auditoria com payload hash.
3. **Ads**: campanha CPC no slot `grid_card` ativa em <15 min; **impressões/clicks** aparecem; cobrança Wallet conforme custo; relatório fecha com spend.
4. **Atribuição**: clique short/QR/WA associado ao pedido → relatório exibe **último clique**; pixels disparam apenas com consentimento.

---

## 8) Segurança & Compliance

* **LGPD**: consentimento para tracking; IP hash + minimização; DSR (export/erase).
* **PCI**: Ads/Conectores nunca tocam PAN; pagamentos seguem no **Pay**.
* **KYC/KYB**: exigido para **Ads** (anunciantes) e para sellers conectados.
* **Antifraude**: limites de spend, reputação de sellers, bloqueio de conteúdo.
* **Observabilidade**: métricas por fila/adslot; logs estruturados e trilhas auditáveis.

---

## 9) Riscos & Mitigações

* **Regras comerciais indefinidas** → marcar *(validar)* e usar versionamento/feature flags.
* **APIs externas instáveis** → filas, backoff exponencial, circuit breaker e painel de reprocesso.
* **Ads fraude/cliques inválidos** → detecção (velocidade de clique, device dup), listas de bloqueio e amostragens.
* **Atribuição enviesada** → prioridade de last‑click documentada; janela parametrizável.

---

## 10) Pendências (validar)

* Unidades por R$ por **origem** e **níveis** (vN da regra).
* Janela de pontuação (venda/liquidação/entrega) e de **atribuição** (7/14/30d).
* Modelos de Ads (CPC/CPM/agenda/segmentação) e tetos de spend.
* Escopo inicial de parceiros no **Connector Hub** (Shopee/Amazon‑like/ERP).
* Políticas de moderação e disputas para sellers/anúncios.

---

## 11) Anexos – Protótipos ASCII

```
[SIGME ▸ Regras]
┌ Origem  Units/BRL  Níveis   Janela   Versão  Ativo  [Publicar vN]
└───────────────────────────────────────────────────────────────────

[Connector ▸ Filas]
┌ job  tipo        status  tentativas  payload-hash  [Reprocessar]
└───────────────────────────────────────────────────────────────────

[Ads ▸ Relatório]
┌ Campanha   Slot        Impr  Click  CTR  Custo  CPA  Receita
└──────────────────────────────────────────────────────────────

[Atribuição ▸ Cliques]
┌ click_id  ts      source  medium  campaign  ref  pedido_id  aplicado
└─────────────────────────────────────────────────────────────────────
```

> Fim do CRD Parte 3/3 (SIGME Bridge & Conectores + Ads + Atribuição).

