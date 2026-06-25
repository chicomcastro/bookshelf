# ADR-0006 — Diário-first como modelo conceitual central

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

O produto pode pender para "catálogo/estante" (organização visual) ou para
"diário de leitura" (registro íntimo de impressões). A escolha cascateia para o
design, o modelo de dados e o que diferencia da concorrência (Goodreads/Skoob).

## Decisão

Adotar **diário-first**: a unidade conceitual central é a **entrada de diário** de
um livro (o que se sentiu, citações, avaliação, spice, tropes, personagens). A
estante é a **vitrine** que organiza essas entradas; o diário é o **coração** que
gera engajamento e retenção.

A North Star Metric reflete isso: _nº de livros com anotação registrada por usuária
ativa_.

## Consequências

- ✅ Diferenciação clara vs. trackers frios; maior valor emocional e retenção.
- ✅ Cada entrada rica alimenta o card compartilhável (ADR-0009) e as estatísticas.
- ⚠️ Exige um editor de anotação muito bem desenhado (baixa fricção, alto prazer).
- ⚠️ Catalogar sem anotar deve continuar possível — diário é o coração, não uma
  obrigação que trava o uso.
