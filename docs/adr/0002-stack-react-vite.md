# ADR-0002 — Stack React + Vite + TypeScript

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

Precisamos de uma SPA leve, instalável (PWA), fácil de manter e evoluir em
comunidade, hospedável estaticamente no GitHub Pages.

## Decisão

Usar **React 18 + Vite + TypeScript**, com **Tailwind CSS** (+ design tokens via
CSS custom properties), **Zustand** (estado), **Dexie** (IndexedDB),
**React Router**, **react-i18next** (i18n) e **vite-plugin-pwa** (PWA).

## Alternativas consideradas

- **Svelte/SvelteKit** — menor bundle e ótimo DX, mas ecossistema menor.
- **Vue** — bom meio-termo; React venceu por familiaridade e contratação/colaboração.

## Consequências

- ✅ Maior ecossistema, fácil atrair contribuidoras, muita documentação.
- ✅ Vite + PWA = build rápido e instalação near-native.
- ⚠️ Bundle maior que Svelte → mitigar com code-splitting e lazy-load de rotas/locales.
