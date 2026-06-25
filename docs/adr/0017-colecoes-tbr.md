# ADR-0017 — Coleções / TBR temáticos

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

Além dos 3 estados (quero ler / lendo / lido), o público cura listas temáticas
("TBR de verão", "spicy faves"). Precisávamos de listas customizadas sem quebrar o
local-first.

## Decisão

- Nova entidade **`Collection`** (`{ id, name, emoji?, bookIds[], … }`) em uma
  tabela Dexie própria — **schema v2**. Um livro pode estar em várias coleções.
- **Criar/adicionar** a partir da página do livro (`CollectionPicker`); **filtrar** a
  estante por coleção (segunda linha de chips); **gerenciar/excluir** em Ajustes.
- Excluir um livro o remove de todas as coleções (integridade na transação).
- Incluídas no **export/import** de backup (campo `collections`).

### Migração v1 → v2 (oportunística)

Aproveitou-se o bump de schema para **indexar `olWorkId`** na tabela `books` — sem
esse índice, `findByWorkId` (deduplicação ao adicionar da busca) lançava erro e o
botão "adicionar" falhava silenciosamente. Corrigido aqui.

## Consequências

- ✅ Organização rica e familiar ao público, mantendo local-first/privacidade.
- ✅ Dedup de adição passa a funcionar (índice `olWorkId`).
- ⚠️ `bookIds` como array no documento (não tabela de junção) — simples e suficiente
  na escala esperada; revisitar se coleções ficarem enormes.
