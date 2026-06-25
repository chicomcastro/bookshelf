# 01 — Visão e Diretrizes de Produto

> Documento vivo. Define _por que_ o Bookshelf existe, _para quem_, e _quais
> princípios_ guiam as decisões. Mudanças aqui devem ser deliberadas.

---

## 1. O problema

Leitoras jovens vivem suas leituras em ferramentas que não foram feitas para
elas:

- **Goodreads / Skoob** são funcionais, mas datados, sociais demais e visualmente
  pobres — a estante não dá orgulho de mostrar.
- **Planilhas e cadernos** são pessoais e bonitos, mas dão trabalho e não têm
  capa, busca nem estatísticas.
- **Notas no celular** guardam impressões, mas se perdem e não se conectam ao
  livro.

O resultado: a leitora não tem **um lugar só dela**, bonito e prático, para
curar o que leu, registrar o que sentiu e planejar o que vem.

## 2. A visão

> **Um santuário digital para a vida de leitura — bonito o suficiente para
> exibir, pessoal o suficiente para guardar segredos.**

O Bookshelf é um **diário de leitura** com uma **estante** como vitrine
(decisão registrada em [ADR-0006](adr/0006-diario-first.md)):

1. **Diário de leitura (o coração)** — resenhas, citações, sentimentos, avaliação,
   spice 🌶️, tropes e personagens favoritos guardados por livro. É o que prende e
   diferencia.
2. **Estante virtual (a vitrine)** — biblioteca visual de livros lidos, lendo e
   desejados, que organiza e exibe essas entradas de diário.

Tudo com a estética _dark academia_ / BookTok que o público já ama, mergulhando
fundo no vocabulário do nicho ([ADR-0007](adr/0007-nicho-booktok.md)), rodando como
um app instalável que funciona offline.

## 3. Público-alvo

### Persona primária — "A Curadora"

- **Quem:** mulher, 20–35 anos, leitora ávida (10–60+ livros/ano).
- **Cultura:** BookTok, Bookstagram, romantasy, dark romance, _new adult_, fantasia.
  Conhece _Fourth Wing_, _ACOTAR_, Colleen Hoover de cor.
- **Comportamento:** lê em e-reader e físico, compra por impulso, monta "TBR"
  (_to be read_), tira foto da estante, ama tracker estético.
- **Dores:** perde o controle do que já leu, esquece o que achou de cada livro,
  acha as ferramentas atuais feias e burocráticas.
- **Desejo:** um espaço dela, bonito, que dê dopamina de organização e seja
  "instagramável".

### Persona secundária — "A Iniciante"

- Voltou a ler recentemente (resoluções, BookTok), quer criar o hábito e ver
  progresso. Valoriza metas e a sensação de evolução.

### Fora de escopo (por enquanto)

- Clubes de leitura / feed social complexo.
- Vendedores/livrarias, autores divulgando, B2B.

## 4. Proposta de valor

| Para... | que... | o Bookshelf... | diferente de... |
|---------|--------|----------------|-----------------|
| leitoras jovens | querem curar e relembrar suas leituras | é uma estante e diário de leitura lindos e offline | Goodreads (feio, social), planilhas (trabalhoso) |

**Frase-síntese:** _"Sua estante, do seu jeito — bonita, privada e sempre com você."_

## 4.1 Modelo de crescimento — "viral por fora, privado por dentro"

O objetivo é **crescer comunidade**, mas o app é local-first, sem rede social
interna ([ADR-0008](adr/0008-crescimento-viral-externo.md)). O crescimento vem de um
loop viral externo:

> Usuária registra uma leitura → gera um **card de resenha** lindo
> ([ADR-0009](adr/0009-compartilhar-card-resenha.md)) → posta no Instagram/TikTok →
> atrai novas leitoras → que instalam o app.

O app é a **fábrica de conteúdo**; a comunidade vive nas redes que a usuária já usa.
Perfis/feed/seguir dentro do app só seriam reconsiderados se surgir um backend
opcional no futuro.

## 5. Princípios de produto

1. **Beleza não é enfeite, é a feature.** Se não dá vontade de mostrar a estante,
   falhamos. Design é requisito, não acabamento.
2. **Privada por padrão.** Os dados são da leitora, ficam no dispositivo dela.
   Nada de conta obrigatória, rastreio ou venda de dados.
3. **Local-first, sem fricção.** Abriu, usou. Sem cadastro, sem espera, funciona
   offline e instala como app.
4. **Carinho nos detalhes.** Microanimações, transições suaves, estados vazios
   acolhedores, _haptics_ quando possível. O app precisa _sentir_ premium.
5. **Conteúdo da leitora é sagrado.** Anotações e _spoilers_ nunca se perdem,
   sempre exportáveis, nunca expostos sem querer.
6. **Comece pequeno, com qualidade.** Melhor 2 telas impecáveis do que 6
   medianas. MVP enxuto e polido.

## 6. Objetivos e métricas (North Star)

**North Star Metric:** _número de livros com anotação registrada por usuária ativa_
— mede engajamento real (não só catalogação fria).

| Objetivo | Métrica | Meta inicial (pós-lançamento) |
|----------|---------|-------------------------------|
| Ativação | % de usuárias que adicionam ≥3 livros na 1ª sessão | ≥ 60% |
| Engajamento | % de livros "lidos" com ≥1 anotação | ≥ 40% |
| Retenção | usuárias que voltam em 7 dias | ≥ 30% |
| Instalação | % que instalam o PWA | ≥ 15% |
| Confiança | % que fazem ≥1 export (backup) | ≥ 20% |

> Como é local-first sem backend, métricas dependem de analytics _privacy-friendly_
> e opt-in (ex.: Plausible/Umami) ou de pesquisa qualitativa. Decisão registrada
> em [`03-arquitetura.md`](03-arquitetura.md).

## 7. Escopo por fase (resumo)

- **MVP (v1.0):** Estante virtual (3 estados) + busca via Open Library + diário
  híbrido por livro (resenha + avaliação + **spice 🌶️ + tropes + personagens +
  mood**) + **card de resenha compartilhável** + export/import + PWA + i18n PT/EN.
- **v1.1:** Dashboard de estatísticas ("Good afternoon, Reader"), metas de leitura,
  estante visual com lombadas, colagem de estante compartilhável.
- **v1.2+:** Tracking de gastos (Budget), coleções/TBR temáticos, import de
  Goodreads/Skoob, sync na nuvem opcional.

Detalhe completo em [`04-backlog.md`](04-backlog.md).

## 8. Riscos e premissas

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Open Library com cobertura/qualidade irregular de capas | Médio | _Fallback_ de capa placeholder + edição manual + cache local |
| Local-first = risco de perda de dados (limpar navegador) | Alto | Backup export/import proeminente; lembrete periódico; roadmap de sync |
| Roteamento SPA no GitHub Pages (404 em refresh) | Médio | Hash routing ou truque `404.html`; ver arquitetura |
| Escopo inflar (4 telas das referências) | Alto | MoSCoW rígido; budget e dashboard ficam fora do MVP |
| "App bonito mas vazio" sem dados | Médio | Onboarding com seed/exemplos + busca rápida de best-sellers |

## 9. Nomes (proposta — a decidir)

Working title: **Bookshelf**. Alternativas para avaliar branding:
_Tomos_, _Estante_, _Margem_ (anotação à margem), _Capítulo_, _Lumen_, _Vellum_.
Decisão de marca fica para depois do protótipo.
