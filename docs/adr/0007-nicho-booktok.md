# ADR-0007 — Nichar em BookTok/romantasy (spice, tropes, personagens, mood)

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A audiência (leitoras 20–35, cultura BookTok/romantasy/dark romance) tem rituais e
vocabulário próprios que ferramentas genéricas (Goodreads/Skoob) não atendem:
nível de picância, tropes, "book boyfriends", humor/sentimento da leitura. Atender
esse vocabulário é o principal fosso competitivo.

## Decisão

Mergulhar fundo no nicho. As seguintes features de domínio entram **no MVP**:

- **Spice/steam rating** 🌶️ — escala 0–5 por livro.
- **Tropes/tags** — chips reutilizáveis (enemies-to-lovers, slow burn, found
  family…), usados como filtro e identidade.
- **Book boyfriends / personagens** — registro de personagens favoritos e notas por
  personagem (introduz a sub-entidade `Character`).
- **Mood/sentimento** — tag emocional ("me destruiu", "cozy", "book hangover").

## Consequências

- ✅ Diferenciação forte e identificação imediata do público-alvo.
- ✅ Dados ricos para filtros, estatísticas e cards compartilháveis.
- ⚠️ **Aumenta o escopo do MVP** — `Character` é uma entidade nova com sua própria
  UI. Aceito conscientemente; pode ser faseado (personagens em uma sub-release) se
  o MVP ficar pesado.
- ⚠️ Tropes/mood precisam de um conjunto inicial curado + permitir customização,
  com i18n (PT/EN).
