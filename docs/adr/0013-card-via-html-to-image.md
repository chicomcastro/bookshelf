# ADR-0013 — Geração do card de resenha via html-to-image

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

O card compartilhável ([ADR-0009](0009-compartilhar-card-resenha.md)) deve ser
gerado 100% no cliente (local-first, sem servidor) a partir de um layout rico
(capa, estrelas, tags, citação).

## Decisão

Renderizar o card como um **componente React/DOM** estilizado e convertê-lo em PNG
com **html-to-image** (`toPng`, `pixelRatio: 2`). Compartilhar via **Web Share API**
(`navigator.share` com `files`) quando disponível, com fallback para download.

## Alternativas consideradas

- **canvas manual** — controle total, mas reescrever o layout em imperativo é caro
  e duplica o design.
- **html2canvas** — popular, porém mais pesado e com mais quirks de renderização
  que o html-to-image para este caso.

## Consequências

- ✅ Um único layout serve tela e imagem; itera rápido com o design system.
- ✅ Sem servidor; preserva privacidade.
- ⚠️ Fontes/efeitos precisam estar carregados antes da captura; imagens externas
  (capas) exigem CORS — cobertas pela Open Library; fallback de capa gerada evita
  bordas.
- ⚠️ Web Share API com arquivos é limitada em alguns navegadores → fallback de
  download garante a função.
