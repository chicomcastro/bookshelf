# ADR-0010 — Formato de diário híbrido (prompts + texto livre)

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A entrada de diário (ADR-0006) pode ser texto livre puro (máxima liberdade, poucos
dados), estruturada pesada (rica em dados, mas burocrática) ou híbrida.

## Decisão

Usar formato **híbrido**: campos guiados de baixa fricção — avaliação (0–5), spice
🌶️ (0–5), tropes (chips), mood, citação favorita — **mais** uma área de **texto
livre** (markdown leve) para resenha/anotações. Os campos guiados são opcionais,
mas alimentam filtros, estatísticas e o card compartilhável (ADR-0009).

## Consequências

- ✅ Equilíbrio entre engajamento (prompts convidam a registrar) e liberdade.
- ✅ Dados estruturados o suficiente para cards e stats, sem afastar quem só quer
  escrever.
- ⚠️ O desenho do editor precisa fazer os prompts parecerem convite, não formulário.
- ⚠️ Suporte a spoiler nas anotações (borrar até toque) permanece requisito.
