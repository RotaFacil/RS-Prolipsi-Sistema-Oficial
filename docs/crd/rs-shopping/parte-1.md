# CRD – RS Shopping (Parte 1/3) – completo + wireframes (ASCII) – v1.0

**Base documental**: PRD_SIGME_RS_SHOP, CRD_RS_PAY_RS_SHOP, RSShop_Paginas_Rotas, CRD_RS_Wallet_Asaas, Mapa do Ecossistema. Tema: **preto & dourado**.

> Nota: Este CRD consolida **Shop + Drop + Marketplace + Ferramentas/Links + Afiliados + Ads + Atribuição + Pedido Integrado**. Pontuação SIGME fica “liga/desliga” (configurada no Admin). Onde houver regra comercial (percentuais, janelas, políticas), marcar **(validar)**.

---

## 1) Escopo e Visão

* **RS Shopping** = criador de lojas + catálogo + checkout via Wallet + Marketplace “Amazon-like” + Dropship + Afiliados + Ads (destaques) + Ferramentas de crescimento (links/UTM/QR/WA, pixels, chatbot) + **Pedido Integrado (Equipe/Hub)** + Digitais (LPs/Templates/Apps) listáveis no marketplace.
* **Objetivos**: reduzir TTM para lançar lojas, aumentar GMV e simplificar split/comissões/pontuação via eventos (Wallet→SIGME), mantendo LGPD/PCI e antifraude.

---

## 2) Módulos & Menus (navegação oficial)

```
TOPBAR: ☰ Apps  RS • Shop • Wallet • IA • Marketplace | Buscar | Ajuda | 🔔 | 👤
SIDEBAR (Shop):
  Dashboard
  Loja ▸ Onboarding | Temas | Domínios | Planos
  Catálogo ▸ Produtos | Categorias | Coleções | Importação
  Pedidos ▸ Lista | Detalhe | Status | NF-e | Rastreio | **Integrado**
  Clientes ▸ Pessoas | Segmentos | CRM
  Estoque ▸ SKUs | Variantes | Alertas
  Envio ▸ Fretes | Parceiros | CDs
  Pagamentos ▸ Wallet/Pay | Meios | Webhooks | Regras Split
  Marketing ▸ Links/UTM/QR/WA | Pixels | Chatbot RSIA
  Afiliados ▸ Programa | Links | Aprovação | Relatórios
  Drop ▸ Catálogo | Importar | Precificação | Pedidos | Frete
  Digitais ▸ LPs | Templates | Apps (licenças)
  Marketplace ▸ Público | Seller Central | Financeiro | Disputas
  Ads ▸ Campanhas | Slots | Relatórios
  Relatórios ▸ Vendas | Tráfego/Atrib | Financeiro | SIGME
  Configurações ▸ Loja | Jurídico/LGPD | Integrações | SIGME Bridge
```

---

## 3) Domínios & Links (padrões)

* **Storefront**: `https://{loja}.rsshop.rsprolipsi.com` *(validar domínio)*
* **Ref/UTM**: `?ref={consultorId}&utm_source=...` • **Link curto**: `https://go.rsprolipsi.com/{code}` • **WhatsApp**: `https://wa.me/{phone}?text={msg}`
* **Cadastro (MMN)**: `/cadastro/distribuidor` • **Afiliado**: `/afiliado` • **Marketplace**: `https://market.rsprolipsi.com` *(validar)*

---

## 4) Fluxos Principais (alto nível)

```
CATÁLOGO → LOJA/STOREFRONT → CHECKOUT (Wallet/Pay) → WEBHOOK → LEDGER/SPLIT → (SIGME se ligado)
DROP Catálogo → Importar → Preço/Regra → Pedido fornecedor → Rastreio → Cliente/SIGME
DIGITAIS (LP/Template/App) → Carrinho/Checkout → Entitlement/Licenças → Downloads/Atualizações
ADS (Slots) → Campanha CPC/CPM → Destaque em Vitrine/Lista → Cobrança Wallet → Relatórios
AFILIADOS/LINKS → Clique (short/UTM/QR/WA) → Pedido → Split/Atribuição → Relatórios
```

---

## 5) Telas & Rotas (wireframes ASCII)

### 5.1 Dashboard

```
┌ KPIs Hoje: Vendas | Sessões | Conversão | Ticket ───────────────────┐
│ Fluxo: Checkout→Pago | Pago→Ledger | Ledger→Split                   │
│ Alertas: Estoque baixo | Webhooks falhos | KYC Wallet                │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.2 Marketing ▸ Links/UTM/QR/WA

```
┌ E‑commerce: https://{loja}... [Copiar] [QR] [Short]
│ Cadastro Distribuidor …  |  Afiliado …  |  UTM Builder …  |  WA Link
└────────────────────────────────────────────────────────────
```

### 5.3 Marketing ▸ Pixels

```
┌ Facebook [ ]  GA4 [ ]  Ads [ ]  TikTok [ ]  | Consent LGPD [ ] [Salvar]
└─────────────────────────────────────────────────────────────────────────
```

### 5.4 Pagamentos ▸ Wallet/Pay

```
┌ Meios: PIX | Cartão | Boleto   | Payment Link [Gerar]
│ Webhooks: ✓ payment.succeeded | ✓ pix.settled | ✓ boleto.paid
└──────────────────────────────────────────────────────────────
```

### 5.5 Pedidos ▸ **Integrado (Equipe/Hub)**

```
┌ Criar Grupo: Nome[Equipe Curitiba]  HUB[Endereço]  Participantes[+]
│ Pagamento: ( ) Link único  ( ) Vários links   Frete: [Cotar]
│ [Criar GRUPO] → Pedido‑Mãe + Sub‑pedidos + Remessa (tracking grupo)
└─────────────────────────────────────────────────────────────────────
```

### 5.6 Drop ▸ Catálogo/Importar

```
┌ Filtros… | [✓] Produto A  [Importar]   [ ] Produto B [Importar]
└───────────────────────────────────────────────────────────────
```

### 5.7 Digitais ▸ LPs/Templates/Apps

```
┌ Loja de Digitais: Busca | Filtros | Destaques
│ Card: [Tema Black&Gold] [Adicionar] — Licenças/Versões/Notas
└─────────────────────────────────────────────────────────────
```

### 5.8 Marketplace ▸ Home/Seller/Disputas

```
┌ Busca │ Categorias │ Ofertas │ Destaques (Slots)
│ Seller Central: +Produto | Pedidos | Financeiro | Devoluções/Disputas
└──────────────────────────────────────────────────
```

---

## 6) Pedido Integrado (Equipe/Hub)

**Objetivo**: permitir que 5–10 consultores comprem juntos e recebam **1 remessa** no HUB (endereço do grupo), com **pagamento único** ou **vários links**.

* **Modelo**: `group_orders` (pedido‑mãe) ↔ `group_order_members` (sub‑pedidos) ↔ `shipment` único (HUB).
* **Pagamento**: via Wallet/Pay com metadados (`grupo_id`, `pedido_id`, `member_id`); **ledger** registra Dr/Cr e **split** normal.
* **Frete**: cálculo por peso/volume total; **rateio** *(validar: proporcional por valor, peso ou igual)*.
* **Etiquetas**: 1 etiqueta do grupo + etiquetas internas por sub‑pedido; romaneio.
* **Tracking**: código do grupo + opcionais individuais (se reetiquetado).
* **Fiscal**: NF‑e de remessa HUB + detalhamento por sub‑pedido *(validar com fiscal)*.

---

## 7) Digitais (LP/Template/App)

* **Vitrine** no Shop/Marketplace; **checkout** pela Wallet/Pay.
* **Entitlements**: chaves/licenças, assentos e versões; **downloads** e changelog.
* **Reembolso** *(validar política para digitais)*.
* **Pontuação**: origem=DIGITAL; publicar `score_event` quando regra ligada no Admin.

---

## 8) Atribuição & Afiliados

* **Clicks**: short/UTM/QR/WA gravados em `attribution_clicks` e vinculados ao `pedido_id`.
* **Regra**: último clique (janela **(validar)**).
* **Afiliados**: links pessoais, aprovação, relatórios; split aplicado no ledger.
* **Pixels**: FB/GA/Ads/TikTok com consentimento LGPD, disparos `ViewContent/AddToCart/Purchase`.

---

## 9) Marketplace & Ads (Destaques)

* **Marketplace público** com busca facetada, reviews e carrinho; Seller Central (KYC Wallet) com produtos/pedidos/financeiro.
* **Ads (slots)**: CPC/CPM/Agenda **(validar modelo)**; cobrança pela Wallet; relatórios de impressões/clicks/custos; moderação de conteúdo.

---

## 10) Segurança & Compliance

* **LGPD**: consentimentos por categoria (analytics/marketing/funcional), DSR (export/erase), retenção.
* **PCI**: tokenização (Pay), **nunca** armazenar PAN; TLS forte.
* **Antifraude**: fingerprint, 3DS quando aplicável, limites de retry, listas de risco.
* **Auditoria**: `audit_logs` de toda mudança relevante.

---

## 11) Modelo de Dados (alto nível — MVP)

* **Catálogo**: `products`, `categories`, `collections`, `product_images`, `inventory`
* **Pedidos**: `orders`, `order_items`, `shipments`, `invoices`, `returns`(futuro)
* **Pagamentos**: `payments` (ref Wallet/Pay), `payment_links` (ref Wallet/Pay)
* **Atribuição**: `attribution_clicks`, `pixel_events`
* **Afiliados**: `affiliate_programs`, `affiliate_links`, `affiliate_payouts`
* **Marketplace**: `sellers`, `seller_products`, `seller_orders`, `seller_disputes`, `seller_ratings`
* **Drop**: `drop_suppliers`, `drop_products`, `drop_orders`, `pricing_rules`
* **Pedidos Integrados**: `group_orders`, `group_order_members`
* **Digitais**: `digital_items`, `entitlements`, `downloads`, `licenses`

---

## 12) Critérios de Aceite (MVP)

1. **Shop**: provisionar loja, publicar tema preto&dourado, cadastrar produto e vender via **Payment Link** (Wallet); receber webhook e ver pedido **Pago**.
2. **Pedido Integrado**: grupo com 3 membros; 3 pagamentos confirmados; gerar 1 remessa e tracking; ledger/split corretos.
3. **Digitais**: comprar template; entitlement criado; download liberado; ledger origem=DIGITAL.
4. **Atribuição/Pixels**: clique de afiliado (UTM) → `Purchase` capturado; relatório mostra origem e comissão.
5. **Marketplace**: seller cadastra item; pedido concluído com split e KYC OK.

---

## 13) Riscos & Mitigações

* **Regras comerciais não definidas** → marcar *(validar)*; usar feature flags no Admin.
* **Duplicidade de eventos** → idempotência (chave de evento), reconciliação D+0/D+1.
* **Fiscais/logísticos (grupo)** → NF‑e de remessa HUB e políticas de rateio documentadas.
* **Conteúdo/Ads** → moderação e SLA de remoção.

---

## 14) Pendências para validação (negócio)

* Domínios definitivos (Storefront/Marketplace).
* **Rateio do frete** no Pedido Integrado.
* Janelas e percentuais de **atribuição/afiliados** e **pontuação SIGME**.
* Modelo de **Ads/Slots** (CPC/CPM/agenda/segmentação).
* Política de **reembolso de digitais**.

---

## 15) Anexos – protótipos ASCII (extra)

```
[Gerador de Link]
┌ Destino: Produto|Categoria|URL  UTM: source/medium/campaign  [Gerar]
│ Link: https://...  [Short] [QR]
└──────────────────────────────────────────────────────────────

[Payment Link]
┌ Valor R$____  Válido até __/__/__  Destino: Pedido|Grupo|Assinatura [Gerar]
└─────────────────────────────────────────────────────────────────────

[Seller Central ▸ Produtos]
┌ +Novo | Título | Estoque | Preço | Status | [Editar]
└─────────────────────────────────────────────────────
```

> Fim do CRD Parte 1/3 (RS Shopping). As Partes 2/3 cobrem **RS Wallet/Pay** e **SIGME Bridge/Conectores** separadamente.

