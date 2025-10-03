# CRD — Estúdio RS (hub de criação)

> Domínio central: **estudio.rsprolipsi.com** · Backend: **RSIA/porta 3006** · Vínculos: raiz(3000), admin(3001), escritório(3002), api(3003), rsshop(3004), rswalletpay(3005).
>
> Nota: se o domínio correto for rsprolipse.com, basta substituir os hosts neste CRD.

---

## 1) Visão geral

O Estúdio RS é o hub único de criação (páginas, artes, textos e leitura/Resumo/RAG) do ecossistema RSPrólipsi. Ele roda sobre o RSIA (porta 3006), atrás do Nginx (80/443), com TLS por subdomínio e “salas” internas: Pages, Canvas/Imagens, Copy e Data.

Princípios: 1 domínio ↔ 1 vhost ↔ 1 processo; portas 3000–3006 privadas; logs sem PII; publish com versões imutáveis e restore em 1 clique.

---

## 2) Objetivos

- Centralizar criação de landing pages, banners/artes, copy/posts e resumos/RAG.
- No/low‑code para time de conteúdo, sem afetar apps pro‑code.
- Roteamento multi‑provedor por intenção (primário/fallback) com métricas.
- Publicação estática versionada, com restore imediato e zero downtime.

---

## 3) Escopo

Salas: Pages (LPs), Canvas/Imagens (geração/edição), Copy/Posts (textos), Data/Leitor & RAG (PDFs/planilhas).
Publish: artefatos em `/home/rsprolipsi/projects/rsia`, com versions e restore.
Orquestrador: seleção automática por intenção + fallback.

Fora do escopo MVP: checkout/pagamentos/Wallet; fluxo SIGME; WYSIWYG avançado de vídeo.

---

## 4) Naming & Domínios

- Hub: `estudio.rsprolipsi.com`
- Subdomínios opcionais (apontando para 3006): `pages.rsprolipsi.com`, `canvas.rsprolipsi.com`, `copy.rsprolipsi.com`, `data.rsprolipsi.com`.

---

## 5) Portas & Processos

raiz(3000), admin(3001), escritório(3002), api(3003), rsshop(3004), rswalletpay(3005), rsia/estúdio(3006). Não expor 3000–3006; apenas 80/443.

---

## 6) Arquitetura macro — wireframes e topologia

Painel “Canva” estático, topologia DNS/Nginx/Portas e fluxo de publish/restore conforme canvas compartilhado.

---

## 7) Salas — funcionalidades

- Pages: blocos (Hero, Lista, Vitrine, Depoimentos, FAQ, CTA, Rodapé), SEO, favicon, publish/restore.
- Canvas/Imagens: geração por prompt/variações, upload, biblioteca, estilos/marcas.
- Copy/Posts: títulos, descrições, e-mails, histórico por projeto.
- Data/Leitor & RAG: ingestão de PDFs/planilhas, resumos com fontes.

---

## 8) Orquestrador multi‑provedor (intenção → provedor)

Classificador de intenção seleciona primário/fallback (Stability/OpenAI Images; Claude/OpenAI; Gemini/Claude; Cohere/Claude; Mistral/OpenRouter…). Ajuste por custo, latência e taxa de sucesso.

---

## 9) Segurança & Compliance

LGPD (consentimento, minimização, sem PII em logs), TLS por domínio, 3000–3006 privados, .env 600, backups. Wallet/PCI fora do Estúdio.

---

## 10) Fluxos principais

- Canvas: Brief → Geração → Preview → Salvar Versão → Publicar → URL pública
- Pages: Brief → Geração (texto) → Preview → Ajustes → Publicar
- Data: Upload → Resumo → Citações/Fontes → Exportar → Publicar
- Publish/Restore: versions/ + symlink `current` com zero downtime

---

## 11) Requisitos funcionais e não funcionais

- UI com abas Pages/Canvas/Copy/Data e Projetos; endpoints `/health`, `/chat`, `/image`, `/projects`, `/diag/*`.
- Publish/Restore versionado; orquestrador com policy editável; métricas de custo/latência/sucesso.
- Disponibilidade ≥ 99,5%; latência‑alvo por tipo; observabilidade e /diag para provedores.

---

## 12) Critérios de aceite, riscos/mitigações e roadmap

Conforme canvas — HTTPS ok, subdomínios funcionam, publish/restore correto, orquestrador registrando provedor e custo, portas internas privadas. Riscos: DNS/cert, instabilidade de provedor, custos, LGPD, operação — mitigados com checklists, fallback, limites, políticas e PM2.

---

## 13) Diagramas (ASCII)

Incluir os três desenhos do canvas (painel, roteamento por intenção e publicação/restore).

*** End of file ***
