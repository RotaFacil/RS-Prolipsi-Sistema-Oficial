# CRD – RS Wallet/Pay (Parte 2/3) – completo + wireframes (ASCII) – v1.0

**Base documental**: CRD_RS_Wallet_Asaas, CRD_RS_PAY_RS_SHOP, PRD_SIGME_RS_SHOP, RSShop_Paginas_Rotas, Mapa_Completo_RSprolipsi. Tema: **preto & dourado**.  

> Escopo: **apenas RS Wallet/Pay** (contas/saldo/ledger/payouts + meios de pagamento/charges/webhooks + reconciliação + split + SIGME Bridge + Pedido Integrado). Onde houver regra comercial (percentuais, janelas, políticas), marcar **(validar)**.

---

## 1) Visão & Princípios

* **Wallet** = conta/saldo, **ledger de dupla entrada**, extratos, **payouts/transferências**, split, KYC/KYB e relatórios.
* **Pay** = meios/cobranças (**PIX, Boleto, Cartão**), **Payment Links** e **Assinaturas**, **webhooks** do PSP e **reconciliação** que abastecem o **ledger** da Wallet.
* **Idempotência**: todo evento persistido com `idempotency_key`/`event_id` → nunca duplicar lançamentos.
* **Compliance**: LGPD, PCI-DSS (tokenização), antifraude, auditoria (impossibilidade de apagar movimentos).

---

## 2) Módulos & Menus (navegação oficial — Wallet)

```
TOPBAR: ☰ Apps  RS • Wallet • Shop • IA • Marketplace | Buscar | Ajuda | 🔔 | 👤
SIDEBAR (Wallet):
  Dashboard
  Receber ▸ PIX | Boleto | Cartão | Payment Link | Assinaturas
  Cobranças ▸ Lista | Detalhe | Regras | Retentativas
  **Grupos (Pedido Integrado)** ▸ Criar | Grupos | Liquidação
  Extratos ▸ Saldo | Movimentações | Comprovantes
  Comissões & Bônus ▸ Extrato | Metas | Pendências
  Payouts & Transferências ▸ Saques | Transferir | Contas
  Split & Regras ▸ Tabelas | Simulação | Auditoria
  Webhooks & Reconciliação ▸ Eventos | Falhas | Reprocessar
  Relatórios ▸ Financeiro | Vendas | Tráfego/Attrib | SIGME
  SIGME Bridge ▸ Eventos | Config | Logs
  Configurações ▸ KYC/KYB | Chaves API | LGPD/Consent | Segurança
```

---

## 3) Fluxos (alto nível)

```
VENDA (Shop/Drop/Mkt/Digital) → Pay cria cobrança → PSP notifica webhook → Reconciliação → Wallet grava LEDGER + aplica SPLIT → (opcional) SIGME SCORE_EVENT
PEDIDO INTEGRADO (Grupo) → criar grupo/HUB → link único OU vários links → liquidação (prévia de ledger) → 1 remessa (tracking grupo) → split/pontos normais
PAYOUT/TRANSFER → solicita saque/transfer → valida KYC/KYB/limites → executa → registra ledger → recibo
RECONCILIAÇÃO D+0/D+1 → confronta PSP × ledger local → abre fila de reprocesso
```

---

## 4) Telas & Wireframes (ASCII)

### 4.1 Dashboard

```
┌ KPIs Hoje ─────────────────────────────────────────────────────────┐
│ Saldo: R$____ | Recebimentos: R$____ | Chargebacks: _ | Ticket: _  │
├────────────────────┬────────────────────┬───────────────────────────┤
│ Fluxo de Vendas    │ Eventos Webhook    │ Alertas                   │
│ ◉ Checkout → Paid  │ ✓ payment.succeeded│ KYC pendente (2)          │
│ ◉ Paid → Ledger    │ ✓ pix.settled      │ Divergência D+1 (1)       │
│ ◉ Ledger → Split   │ ! boleto.paid (err)│                           │
└────────────────────┴────────────────────┴───────────────────────────┘
```

### 4.2 Receber ▸ Payment Link / PIX / Boleto / Cartão / Assinaturas

```
┌ Payment Link ───────────────────────────────────────────────────────┐
│ Valor [R$____]  Descrição [____]  Destino: (Pedido|Grupo|Assinatura)│
│ Split: [Tabela ▼]  Válido até [__/__/____]                          │
│ [Gerar Link]  [QR]  [Copiar]                                         │
└──────────────────────────────────────────────────────────────────────┘
┌ Ativações ──────────────────────────────────────────────────────────┐
│ PIX (QR dinâmico)  |  Boleto (carteira/convênio)  |  Cartão (token) │
│ [Salvar] [Testar recebimento]                                        │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.3 Cobranças & Retentativas

```
┌ Cobranças (lista) ──────────────────────────────────────────────────┐
│ #   Tipo  Valor  Cliente  Status  Origem  Ref        Atualizado      │
│ 17  PIX   199    Fulano   Pago    SHOP    order#123  10:34            │
└──────────────────────────────────────────────────────────────────────┘
┌ Regras & Retentativas ──────────────────────────────────────────────┐
│ Política: cartão (x3 tentativas), boleto (validade 3d) *(validar)*  │
│ [Salvar]                                                             │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.4 **Grupos (Pedido Integrado)**

```
┌ Criar Grupo ────────────────────────────────────────────────────────┐
│ Nome [Equipe Curitiba]  HUB [Endereço]  Participantes [+]           │
│ Pagamento: ( ) Link único  ( ) Vários links   Frete: [Cotar]         │
│ [Criar GRUPO] → Pedido‑Mãe + Sub‑pedidos + Remessa (tracking grupo)  │
└──────────────────────────────────────────────────────────────────────┘
┌ Liquidação (detalhe) ───────────────────────────────────────────────┐
│ Pagos: 5/7  |  Regra de liberação: [100% pagos] [≥80% + autorização] │
│ Preview de Ledger:                                                   │
│  Dr Clientes → Cr Carteira Loja (valor itens)                        │
│  Dr Clientes → Cr Frete (conta logística)                            │
│  Dr Carteira Loja → Cr Split (rede/afiliado/matriz)                  │
│ [Liberar] [Estornar membro] [Reemitir link] [Imprimir etiquetas]     │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.5 Extratos / Comissões & Bônus / Metas

```
┌ Extratos ───────────────────────────────────────────────────────────┐
│ Filtros: período | origem (SHOP/DROP/MKT/AFIL/DIGITAL/GRUPO) | grupo │
│ Mov.: data | Dr/Cr | conta | valor | ref | idempotency_key         │
└──────────────────────────────────────────────────────────────────────┘
┌ Comissões & Bônus & Metas ──────────────────────────────────────────┐
│ Unidades/Pontos (origem) | Bônus pagos | Metas  | [Simular regra]   │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.6 Webhooks & Reconciliação

```
┌ Eventos (fila) ─────────────────────────────────────────────────────┐
│ payment.succeeded | pix.settled | boleto.paid | refund.succeeded …  │
│ Falhas: [Reprocessar] [Ignorar] [Ver payload]                        │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.7 Payouts & Transferências / Split & Regras / SIGME Bridge

```
┌ Payouts & Transferências ───────────────────────────────────────────┐
│ Saldo disponível: R$___  |  [Sacar via PIX] [Transferir interna]    │
└──────────────────────────────────────────────────────────────────────┘
┌ Split & Regras ─────────────────────────────────────────────────────┐
│ Tabela v3: loja x%, rede y%, afiliado z%, matriz w%  *(validar)*    │
│ [Simular]  [Publicar v4]  [Histórico de mudanças]                   │
└──────────────────────────────────────────────────────────────────────┘
┌ SIGME Bridge ───────────────────────────────────────────────────────┐
│ Eventos: origem=SHOP|DROP|MKT|AFIL|DIGITAL|GRUPO  status: sim/efet. │
│ [Ligar regras] [Desligar regras]  Logs/Auditoria                    │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5) APIs & Eventos (MVP)

**Pay (cobranças)**

* `POST /api/payments/links` → cria link (valor, descrição, split_table_id, destino: pedido|grupo|assinatura).
* `POST /api/charges/pix` | `/boleto` | `/card` → cria cobrança.
* `POST /api/subscriptions` → cria/ativa assinatura.
* **Webhooks (PSP)**: `payment.succeeded|failed|refunded|chargeback.opened|chargeback.closed|pix.settled|boleto.paid|subscription.charge.succeeded`.

**Wallet (ledger/payout/split)**

* `POST /api/wallet/ledger` (interno) → grava dupla entrada idempotente.
* `POST /api/wallet/payouts` | `/transfers` → executa movimentos.
* `GET /api/wallet/extract` → extrato filtrável.
* `POST /api/wallet/split/simulate` | `/publish` → versionar regra.

**Grupos (Pedido Integrado)**

* `POST /api/groups` → cria `group_order` + membros.
* `POST /api/groups/{id}/paylinks` → emite links por membro.
* `POST /api/groups/{id}/settle` → valida regra e libera remessa (gera ledger).

**SIGME Bridge**

* `POST /api/sigme/events` → publica `score_event (simulado|efetivo)` por origem.

---

## 6) Modelo de Dados (alto nível)

* **Contas**: `wallet_accounts(id, owner_type, owner_id, status)` • **Saldos**: `wallet_balances(account_id, currency, amount)`
* **Ledger**: `wallet_ledger_entries(id, ts, debit_account, credit_account, amount, currency, origin, ref_type, ref_id, idempotency_key, meta)`
* **Cobranças**: `wallet_charges(id, type, status, amount, customer_id, origin, ref_id, split_table_id, psp_charge_id, expires_at)`
* **Payment Links**: `payment_links(id, amount, description, destination, split_table_id, short_code, expires_at, status)`
* **Assinaturas**: `subscriptions(id, plan_id, status, start_at, next_charge_at, cancel_at)`
* **Webhooks**: `wallet_webhook_events(id, event_id, type, payload_hash, received_at, processed_at, status, retries)`
* **Split**: `split_tables(id, version, active)` • `split_rules(id, table_id, party, percentage, valid_from, valid_to)`
* **Payouts/Transfers**: `wallet_payouts(id, account_id, amount, method, status, executed_at)` • `wallet_transfers(id, from_account, to_account, amount, status)`
* **Grupos**: `group_orders(id, name, hub_address, freight_quote, release_rule, tracking_code, status)` • `group_order_members(id, group_id, member_id, order_id, pay_link_id, paid_at, amount)`
* **SIGME**: `sigme_score_events(id, origin, units, simulated, ref_type, ref_id, created_at)`
* **Auditoria**: `audit_logs(id, actor, action, entity, entity_id, before, after, ts)`
* **KYC**: `kyc_records(id, owner_id, status, provider_ref)` • **Contas bancárias**: `bank_accounts(id, owner_id, pix_key, bank_code, branch, account)`

---

## 7) Critérios de Aceite (MVP)

1. **Payment Link**: gerar link PIX; pagar; receber `payment.succeeded`; gravar **ledger (Dr/Cr)** e aplicar **split**; extrato mostra movimento; recibo disponível.
2. **Reconciliação**: introduzir divergência simulada D+1; clicar **Reprocessar** → status OK; `audit_logs` registra a ação.
3. **Pedido Integrado**: grupo com 3 membros; 3 pagamentos confirmados; **Liquidação** libera; 1 remessa com tracking; ledger correto por origem `GRUPO`.
4. **Payout/Transfer**: KYC ok; fazer saque via PIX; ledger grava; recibo gerado.
5. **SIGME Bridge**: com regra **desligada**, publicar eventos **simulados**; ao ligar, próximos eventos ficam **efetivos**.

---

## 8) Segurança & Compliance

* **PCI**: sem armazenar PAN; usar token do PSP; TLS/TCP modernos.
* **LGPD**: consentimentos; DSR (export/erase); minimização de dados; mascaramento em logs.
* **Antifraude**: device fingerprint, 3DS quando aplicável, limites de tentativas, listas de risco.
* **Autorização**: RBAC/ABAC; RLS no banco para isolamento por conta/loja.
* **Observabilidade**: métricas (taxa de aprovação, falhas webhook, reconciliação), logs estruturados e trilhas de auditoria invioláveis.

---

## 9) Riscos & Mitigações

* **Regras comerciais não definidas** → marcar *(validar)* e usar feature flags.
* **Duplicidade de eventos** → `idempotency_key` + reconciliação D+0/D+1.
* **Chargebacks/estornos** → fluxos de reversão que **espelham** o crédito original no ledger.
* **Grupo (fiscal/logística)** → NF-e de remessa HUB + política de rateio *(validar)*.

---

## 10) Pendências (validar)

* Percentuais e **versões de split** por canal (loja/seller/afiliado/rede/matriz).
* Regra de **liberação** do Grupo (100% pagos vs ≥80% + autorização) e de **rateio de frete**.
* Janelas e percentuais de **pontuação SIGME** por origem.
* Política de **reembolso** para digitais e assinaturas; SLAs de payout.

---

## 11) Anexos – Protótipos ASCII (extra)

```
[Webhooks]
┌ Evento         ID         Status   Recebido     Processado  [Reproc]
│ payment.succ   evt_abc    ok       10:31        10:31:01     [  ]
└─────────────────────────────────────────────────────────────────────

[Extrato]
┌ Data  Conta(Debit) → Conta(Credit)  Valor  Origem Ref   IdempKey
│ 10:34 Clientes → Carteira Loja      199    SHOP   #123  abc...
│ 10:34 Carteira Loja → Rede          20     SPLIT  #123  def...
└─────────────────────────────────────────────────────────────────────
```

> Fim do CRD Parte 2/3 (RS Wallet/Pay). Parte 3/3 cobrirá **SIGME Bridge & Conectores/Ads avançado** com a mesma precisão.

---

## Apêndice — Resumo & Plano rápido

1. Resumo (2 linhas)
   Criei no **canvas** o **CRD – RS Wallet/Pay (Parte 2/3)**, completo e “desenhado” em ASCII: módulos, fluxos, APIs/eventos, modelo de dados, critérios de aceite, riscos e pendências — com **Pedido Integrado** (Grupo/HUB), ledger duplo, split, webhooks e reconciliação.
   Baseado no CRD_RS_Wallet_Asaas, CRD_RS_PAY_RS_SHOP, PRD_SIGME_RS_SHOP, RSShop_Paginas_Rotas e Mapa do Ecossistema; tema **preto & dourado** preservado.

2. Plano rápido (bullets com riscos)

* **Não inventar regra**: percentuais de split, janela de pontuação e política de liberação do grupo ficam *(validar)*.
* **Idempotência/Reconciliação**: toda escrita no ledger exige `idempotency_key`; divergências sanadas em D+0/D+1 com reprocesso e auditoria.
* **Fiscal/logística (Grupo)**: NF-e de remessa HUB e **rateio** (valor/peso/igual) precisam fechar no Admin.
* **PCI/LGPD/KYC** obrigatórios: carta de segurança definida e logs sem PII sensível.

3. Arquivos/estruturas (caminho + função)

* **Canvas**: `CRD – RS Wallet/Pay (Parte 2/3) – completo + wireframes (ASCII) – v1.0` → documento master da Wallet/Pay para repassar ao time.
* **Sugestão no repo**:

  * `docs/crd/rs-wallet/parte-2.md` (conteúdo do canvas)
  * `docs/crd/rs-shopping/parte-1.md` (já entregue)
  * `docs/crd/sigme-bridge/parte-3.md` (próximo)

4. Comandos/Scripts Bash (exportar PDF/DOCX; `set -euo pipefail`, logs em `./logs/AAAA-MM-DD.log`)

```bash
set -euo pipefail
LOG="./logs/$(date +%F)-export-crd-wallet.log"; mkdir -p "$(dirname "$LOG")"; exec 1> >(tee -a "$LOG") 2>&1

# Salve o conteúdo do canvas em: docs/crd/rs-wallet/parte-2.md
# PDF (requer pandoc + wkhtmltopdf ou tectonic)
pandoc docs/crd/rs-wallet/parte-2.md -o docs/crd/rs-wallet/parte-2.pdf \
  --from gfm --pdf-engine=wkhtmltopdf --metadata title="CRD – RS Wallet/Pay (Parte 2/3)"

# DOCX
pandoc docs/crd/rs-wallet/parte-2.md -o docs/crd/rs-wallet/parte-2.docx \
  --from gfm --metadata title="CRD – RS Wallet/Pay (Parte 2/3)"

echo "Arquivos gerados: parte-2.pdf e parte-2.docx em docs/crd/rs-wallet/"
```

5. Como rodar (passo a passo)

1) Revise o **canvas** e confirme: módulos, APIs/eventos, modelo de dados e o fluxo de **Grupo (Pedido Integrado)**.
2) Exporte para Markdown e rode o script acima para gerar **PDF/DOCX**.
3) Liste quais regras quer **validar primeiro** (percentuais do split, liberação do grupo, janelas de pontuação, reembolso digital) para eu travar os ICRTs correspondentes.

6. Testes (unitários + integração, “provas de ouro”)

* **Payment Link (PIX)**: pagar → `payment.succeeded` → **ledger Dr/Cr** gravado + **split** aplicado; extrato mostra movimento; recibo disponível.
* **Reconciliação**: criar divergência D+1; **Reprocessar** corrige; `audit_logs` registra tudo.
* **Grupo**: 3 membros pagos → **Liquidação** libera; 1 remessa com tracking do grupo; ledger com `origem=GRUPO`.
* **Payout/Transfer**: KYC ok → saque via PIX → ledger e comprovante emitidos.
* **SIGME Bridge**: regra desligada → eventos **simulados**; ligada → eventos **efetivos**.

7. O que salvar no recap (decisões, padrões, pendências)

* **Decisões**: Wallet/Pay tem 12 módulos; **ledger de dupla entrada**, webhooks idempotentes, reconciliação D+0/D+1; Grupo com pedido-mãe + sub-pedidos + remessa única.
* **Padrões**: tema preto & dourado; RBAC/ABAC + RLS; logs estruturados; auditoria inviolável; KYC/KYB antes de payout.
* **Pendências** *(validar)*: split por canal (loja/seller/afiliado/rede/matriz), regra de liberação/rateio no Grupo, janelas e percentuais da pontuação, política de estorno/chargeback/digitais.

8. Próximos passos

* Se estiver ok, eu preparo a **Parte 3/3 – SIGME Bridge & Conectores/Ads avançado** no mesmo padrão (CRD completo + wireframes ASCII + scripts de exportação). Depois fecho os **ICRTs** por módulo para o DEV começar a produzir.

