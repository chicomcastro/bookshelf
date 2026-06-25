# ADR-0005 — Hash routing no GitHub Pages

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

GitHub Pages serve arquivos estáticos e não reescreve rotas para `index.html`.
Com `BrowserRouter`, um refresh ou deep link em `/livro/123` retorna 404.

## Decisão

Usar **hash routing** (`/#/livro/123`) no MVP. Refresh e deep links funcionam sem
truque de servidor.

## Alternativas consideradas

- `BrowserRouter` + `404.html` que reescreve para `index.html` — URLs mais limpas,
  mas frágil e com piscar de redirecionamento.

## Consequências

- ✅ Zero dor com refresh/deep link no Pages; setup trivial.
- ⚠️ URLs menos "bonitas" (`/#/`). Reavaliar se migrarmos para domínio próprio com
  hospedagem que suporte fallback de SPA (novo ADR).
