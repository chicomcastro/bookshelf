# ADR-0014 — Dashboard com stats derivadas e meta de leitura local

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A v1.1 traz o painel "Good afternoon, Reader" (referência IMG_0917) com
estatísticas de leitura, estante visual com lombadas e meta anual. Sendo
local-first ([ADR-0001](0001-local-first-sem-backend.md)), não há backend para
agregar métricas.

## Decisão

- **Stats 100% derivadas no cliente** a partir dos livros (`src/lib/stats.ts`):
  lidos no ano, lendo agora, total, nota média, picância média, top tropes/moods.
  Nada é persistido de forma redundante — recalcula-se a cada render via
  `useLiveQuery`.
- **Meta de leitura anual** guardada localmente (store `goal`, em `localStorage`),
  não no modelo de dados Dexie — é preferência da usuária, não conteúdo.
- **Estante visual com lombadas** (`ShelfVisualization`): cada lombada deriva cor do
  título (mesma paleta das capas-fallback) e altura/largura de `pageCount`/hash, sem
  novos dados.
- **Dashboard vira aba na navegação** (Estante · Painel · Buscar · Ajustes).

## Consequências

- ✅ Sem novas entidades nem migração; coerente com local-first e privacidade.
- ✅ Stats sempre consistentes com a estante (fonte única de verdade).
- ⚠️ `pagesThisYear` depende de `pageCount`, raramente presente na busca da Open
  Library → exibimos páginas só quando há dado; o destaque é nº de livros.
- ⚠️ Recalcular a cada render é barato no volume esperado (centenas de livros); se
  crescer muito, memoizar/paginar.
