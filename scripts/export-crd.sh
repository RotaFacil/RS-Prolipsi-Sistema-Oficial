#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USG'
Uso: scripts/export-crd.sh [ARQUIVO.md ...]

Gera PDF e DOCX a partir de um ou mais arquivos Markdown.
Se nenhum arquivo for informado, exporta todos em docs/crd/**.md

Pré-requisitos: pandoc + (wkhtmltopdf ou tectonic)
Logs: ./logs/YYYY-MM-DD-export-crd.log
USG
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage; exit 0
fi

LOG="./logs/$(date +%F)-export-crd.log"
mkdir -p "$(dirname "$LOG")"
exec 1> >(tee -a "$LOG") 2>&1

shopt -s nullglob
FILES=( "$@" )
if [[ ${#FILES[@]} -eq 0 ]]; then
  while IFS= read -r -d '' f; do FILES+=("$f"); done < <(find docs/crd -type f -name '*.md' -print0)
fi

echo "Exportando ${#FILES[@]} arquivo(s)"
for md in "${FILES[@]}"; do
  base="${md%.md}"
  title=$(basename "$md")
  echo "- $md -> ${base}.pdf / ${base}.docx"
  pandoc "$md" -o "${base}.pdf" --from gfm --pdf-engine=wkhtmltopdf --metadata title="${title}" || true
  pandoc "$md" -o "${base}.docx" --from gfm --metadata title="${title}"
done

echo "Concluído. Saída em docs/crd/**.pdf e **.docx"

