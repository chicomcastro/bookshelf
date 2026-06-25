# ADR-0011 — CI por PR + CD para GitHub Pages via GitHub Actions

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

Queremos visibilidade de qualidade em cada Pull Request e publicação automática
do app. O hosting é GitHub Pages (estático), e o repositório vive no GitHub.

## Decisão

Usar **GitHub Actions** com dois workflows:

- **`ci.yml`** — roda em cada PR (e push na main): `typecheck` + `lint` + `build`,
  e sobe o `dist/` como artefato para inspeção. Dá um check verde/vermelho visível
  no PR.
- **`deploy.yml`** — em cada push na `main`, faz build e publica no **GitHub Pages**
  via `configure-pages` / `upload-pages-artifact` / `deploy-pages`.

## Consequências

- ✅ Todo PR mostra status de qualidade; regressões barram o merge.
- ✅ `main` sempre publicada automaticamente; sem deploy manual.
- ⚠️ Requer habilitar Pages com origem "GitHub Actions" nas configurações do repo
  (uma vez).
- ⚠️ `npm ci` exige `package-lock.json` versionado.
