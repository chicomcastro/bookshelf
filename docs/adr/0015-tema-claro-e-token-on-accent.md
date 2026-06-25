# ADR-0015 — Tema claro e token `on-accent`

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A v1.2 adiciona tema claro (além do escuro padrão e do modo "system"). Ao migrar,
descobriu-se que vários botões usavam `text-base` (a cor do fundo do app) como
"texto sobre o dourado" — o que só funciona enquanto o fundo é escuro. No tema
claro, isso produziria texto claro sobre dourado (ilegível).

## Decisão

- **Token dedicado `--ink-on-accent`** (mapeado para a cor Tailwind `onaccent`),
  fixo e escuro **nos dois temas**, para texto/ícones sobre superfícies de acento
  (dourado). Todas as ocorrências de `text-base` sobre `bg-gold` migraram para
  `text-onaccent`.
- **Tema claro** definido em `:root[data-theme='light']` sobrescrevendo os tokens de
  superfície/texto/acento (paleta pergaminho quente). `color-scheme` setado por tema.
- **Modo "system"** acompanha `prefers-color-scheme` em tempo real (listener no
  `matchMedia`), e o `<meta name="theme-color">` é atualizado a cada troca.

## Consequências

- ✅ Contraste correto do texto sobre o dourado independente do tema.
- ✅ Tema claro coeso sem reescrever componentes (tudo via tokens CSS).
- ⚠️ Acentos dourado/rosa como **texto** sobre o claro ficam em contraste aceitável,
  porém perto do limite AA em rótulos pequenos — afinar a paleta de acento-no-claro é
  um follow-up de acessibilidade.
- ⚠️ Overlays utilitários `white/x` (bordas/realces sutis) somem no tema claro; a
  definição passa a depender da elevação das superfícies. Aceitável por ora.
