# ADR-0016 — Feedback tátil (haptics) nas ações-chave

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A experiência precisa ser encantadora e "near-native" ([ADR-0012](0012-bibliotecas-de-experiencia.md)).
Em dispositivos móveis, um leve feedback tátil reforça a sensação de app nativo.

## Decisão

Util `tap()` / `celebrate()` sobre a **Vibration API** (`navigator.vibrate`),
acionada em ações-chave: adicionar livro, favoritar e mudar de estado (com um padrão
de "celebração" ao marcar como **lido**). Respeita `prefers-reduced-motion` e é
no-op onde a API não existe (iOS Safari, desktop).

## Consequências

- ✅ Microfeedback gostoso no celular, sem dependências.
- ✅ Degradação graciosa: silencioso onde não há suporte.
- ⚠️ Sem haptics em iOS Safari (API ausente) — aceitável; é um realce, não função.
