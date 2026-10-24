# DER interativo — Gestao.fdb

Abra `index.html` no navegador (funciona offline, sem servidor). Os dados estão em `dados.js` (gerado do `metadados_gestao.json`; só estrutura, sem registros).

Abra `guia.html` para consultar os roteiros de operação, seguir checklists e praticar os cálculos de preço e despesas recorrentes. O guia é educacional: não grava no Gestão.fdb. Os links de referência abrem as tabelas correspondentes no mapa.

- Busque tabela ou coluna, filtre por prefixo ou classe (A preservar, B limpar, C confirmar, do `classificacao_tabelas.csv`).
- Clique numa tabela para centrar o diagrama: pais acima, filhas abaixo (profundidade 1 ou 2). Arraste para mover, roda do mouse para zoom.
- Só aparecem relacionamentos que existem como FK nos metadados (nenhum hipotético).
- Exporta SVG, PNG, JSON da tabela e CSV de todas as FKs.
- No guia, o progresso do checklist fica salvo localmente neste navegador.
