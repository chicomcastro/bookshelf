# Ativar a busca via Google Books (opcional)

Por padrão o Bookshelf busca livros na **Open Library** (sem chave). Para uma busca
melhor — sobretudo de títulos em **português** — dá para ativar a **Google Books
API** com uma chave. Quando a chave existe, o Google Books vira a **fonte principal**
e a Open Library continua como **fallback**; sem chave, nada muda.

## Passo a passo

1. **Crie a API key**
   - Acesse o [Google Cloud Console](https://console.cloud.google.com/).
   - Crie/selecione um projeto.
   - Ative a **Books API** (APIs & Services → Library → "Books API" → Enable).
   - APIs & Services → Credentials → **Create credentials → API key**.
   - (Recomendado) Em **Application restrictions**, restrinja por **HTTP referrer**
     para `https://chicomcastro.github.io/*` — assim a chave só funciona no seu site.
   - (Recomendado) Em **API restrictions**, limite a chave à **Books API**.

2. **Adicione como secret no GitHub** (produção)
   - Repositório → **Settings → Secrets and variables → Actions → New repository secret**.
   - Nome: **`GOOGLE_BOOKS_API_KEY`** · Valor: a chave.
   - O próximo deploy (push na `main`) já sai com a busca via Google Books ligada.
     Os workflows injetam o secret como `VITE_GOOGLE_BOOKS_KEY` no build.

3. **Local (opcional)**
   - `cp .env.example .env.local` e preencha `VITE_GOOGLE_BOOKS_KEY=...`.
   - `npm run dev`.

## Notas

- A chave fica **embutida no bundle do cliente** (é assim com apps estáticos). Por
  isso a **restrição por referrer** é importante — ela impede uso da chave fora do
  seu domínio.
- A Books API tem cota diária gratuita; com a restrição e uso normal, é suficiente.
- Nada de chave commitada no repo: `.env*` está no `.gitignore`; em produção vem do
  secret do Actions.
