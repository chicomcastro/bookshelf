# ADR-0012 — Bibliotecas de experiência (motion, ícones, fontes)

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A experiência precisa ser **encantadora** para sustentar o loop viral
([ADR-0008](0008-crescimento-viral-externo.md)): transições suaves, microinterações
e uma identidade tipográfica forte. Sem isso, a estética "instagramável" não se
sustenta.

## Decisão

- **framer-motion** para animações declarativas (transições de página, entrada de
  cards, toast, modal do card). Respeita `prefers-reduced-motion`.
- **lucide-react** para ícones (traço fino, consistente, tree-shakeable).
- **@fontsource-variable/fraunces** (display serifada) + **inter** (UI),
  self-hosted — funciona offline e sem CDN externa.

## Consequências

- ✅ UX fluida e identidade visual coesa com baixo esforço.
- ✅ Fontes self-hosted = sem dependência de rede e coerente com offline-first.
- ⚠️ framer-motion adiciona ~30kb gzip ao bundle → aceitável; reavaliar com
  code-splitting se o bundle crescer (hoje ~165kb gzip).
