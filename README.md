# DER interativo — Gestao.fdb
Abra `index.html` no navegador (funciona offline, sem servidor). Dados em `data/dados.js` (gerado do `metadados_gestao.json`; só estrutura, sem registros).
- Busque tabela ou coluna, filtre por prefixo ou classe (A preservar, B limpar, C confirmar, do `classificacao_tabelas.csv`).
- Clique numa tabela para centrar o diagrama: pais acima, filhas abaixo (profundidade 1 ou 2). Arraste para mover, roda do mouse para zoom.
- Só aparecem relacionamentos que existem como FK nos metadados (nenhum hipotético).
- Exporta SVG, PNG, JSON da tabela e CSV de todas as FKs.
