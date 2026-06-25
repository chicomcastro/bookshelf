# ADR-0009 — Compartilhamento via card de resenha (imagem) no MVP

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

O crescimento depende de conteúdo compartilhável (ADR-0008). Sendo diário-first
(ADR-0006), o artefato mais alinhado é a resenha de um livro — e não apenas a
estante como coleção.

## Decisão

O artefato compartilhável principal do MVP é o **card de resenha por livro**: uma
imagem _story-ready_ com capa + avaliação + spice + trope(s) + citação favorita +
marca discreta do app. Gerado no cliente (ex.: render em `<canvas>`/SVG → PNG) para
download/compartilhamento, sem servidor.

A **colagem da estante** ("minha estante 2026") fica para uma release seguinte.

## Consequências

- ✅ Casa com diário-first e gera o loop viral com baixo esforço da usuária.
- ✅ Geração 100% client-side mantém local-first e privacidade.
- ⚠️ Precisa de templates de card bem desenhados e responsivos a conteúdo variável
  (citações longas, sem capa, etc.).
- ⚠️ Watermark/atribuição precisa ser elegante (não poluir) mas presente (marketing).
