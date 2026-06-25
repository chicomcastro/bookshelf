# 04 — Backlog do Produto

> Épicos → histórias de usuário com critérios de aceite, priorizados por **MoSCoW**
> e organizados em releases. Backlog vivo: refinar a cada ciclo.

**Legenda de prioridade (MoSCoW):**
`M` Must (MVP) · `S` Should · `C` Could · `W` Won't (agora)
**Estimativa (T-shirt):** XS · S · M · L · XL

---

## Mapa de releases

| Release | Tema | Épicos |
|---------|------|--------|
| **v1.0 — MVP** | Estante + Anotações | E1, E2, E3, E4, E7 (parcial), E8 (parcial) |
| **v1.1** | Progresso & beleza | E5 (dashboard), E6 (metas), estante visual |
| **v1.2+** | Expansão | E9 (budget), coleções, compartilhar, sync |

---

## E1 — Fundação técnica & PWA  _(Must)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 1.1 | Como dev, quero o projeto scaffoldado (Vite+React+TS+Tailwind) | M | M | build roda; lint/format/test configurados; tokens do DS aplicados |
| 1.2 | Como dev, quero CI/CD para GitHub Pages | M | S | push na main → deploy automático; `base` correto; site no ar |
| 1.3 | Como usuária, quero instalar o app na tela inicial | M | M | manifest + SW válidos; instalável (Android/iOS/desktop); abre standalone |
| 1.4 | Como usuária, quero usar offline | M | M | app shell em cache; estante carrega sem rede; capas com fallback |
| 1.5 | Como dev, quero roteamento que sobrevive a refresh no Pages | M | S | deep link e refresh funcionam (hash routing) |

## E2 — Estante virtual  _(Must)_ — coração do MVP

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 2.1 | Como usuária, quero ver meus livros em grade bonita | M | M | `BookGrid` responsivo; capa 2:3; skeleton no load; estado vazio acolhedor |
| 2.2 | Como usuária, quero separar por estado (Lido/Lendo/Quero ler) | M | S | abas/seções por `status`; contagem por estado |
| 2.3 | Como usuária, quero filtrar por categoria/gênero | S | S | `FilterBar` com chips roláveis; combina com estado |
| 2.4 | Como usuária, quero mudar o estado de um livro rápido | M | S | `StatusChip` editável; ao marcar "Lido" sugere data de término |
| 2.5 | Como usuária, quero favoritar livros | S | XS | toggle de favorito; filtro "favoritos" |
| 2.6 | Como usuária, quero buscar/ordenar minha estante | S | S | busca local por título/autor; ordenar por recente/título/rating |

## E3 — Adicionar livros (Open Library)  _(Must)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 3.1 | Como usuária, quero buscar um livro por título/autor | M | M | `SearchSheet`; debounce; resultados com capa/título/autor/ano |
| 3.2 | Como usuária, quero adicionar à estante escolhendo o estado | M | S | 1 toque adiciona; escolhe estado; toast de confirmação; evita duplicado |
| 3.3 | Como usuária, quero adicionar um livro manualmente | S | S | formulário título/autor/capa(upload ou URL)/páginas/ano |
| 3.4 | Como usuária, quero editar metadados de um livro | S | S | editar campos; capa substituível; persiste |
| 3.5 | Como usuária, quero fallback quando não há capa | M | XS | placeholder gerado (título sobre cor da paleta) |

## E4 — Anotações & resenhas  _(Must)_ — coração do MVP

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 4.1 | Como usuária, quero uma página de detalhe do livro | M | M | capa grande, metadados, rating, status, datas, área de notas |
| 4.2 | Como usuária, quero escrever uma resenha | M | S | `NoteEditor` markdown leve; salva automático; editável |
| 4.3 | Como usuária, quero várias anotações por livro | M | S | múltiplas notas; ordenadas; com página opcional |
| 4.4 | Como usuária, quero marcar nota como spoiler | M | XS | toggle spoiler; nota fica borrada até toque |
| 4.5 | Como usuária, quero salvar citações | S | S | tipo "citação"; exibição destacada |
| 4.6 | Como usuária, quero avaliar de 0 a 5 estrelas | M | XS | `RatingStars` com meia-estrela; persiste |
| 4.7 | Como usuária, quero registrar datas de início/fim | S | XS | date pickers; alimentam stats futuras |

## E5 — Dashboard de leitura  _(Should — v1.1)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 5.1 | Como usuária, quero uma home "Good afternoon, Reader" | S | M | saudação por horário/idioma; `StatCard`s (lidos no ano, lendo agora, total) |
| 5.2 | Como usuária, quero a estante visual com lombadas | S | L | `ShelfRow` com lombadas coloridas (IMG_0917) |
| 5.3 | Como usuária, quero ver páginas/livros por mês | C | M | gráfico de barras simples |

## E6 — Metas de leitura  _(Should — v1.1)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 6.1 | Como usuária, quero definir meta anual de livros | S | S | meta editável; progresso visual; celebração ao atingir |
| 6.2 | Como usuária, quero ver minha sequência/ritmo | C | M | streak/ritmo de leitura estimado |

## E7 — Backup & dados  _(Must parcial)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 7.1 | Como usuária, quero exportar meus dados | M | S | download JSON com schemaVersion; inclui livros+notas+settings |
| 7.2 | Como usuária, quero importar um backup | M | S | upload JSON; valida versão; merge ou substituir com aviso |
| 7.3 | Como usuária, quero ser lembrada de fazer backup | C | XS | lembrete suave após N livros/dias |
| 7.4 | Como usuária, quero apagar todos os dados | S | XS | reset com confirmação dupla |

## E8 — Internacionalização & ajustes  _(Must parcial)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 8.1 | Como usuária, quero o app em PT-BR | M | S | i18n configurado; PT-BR completo; default por `navigator.language` |
| 8.2 | Como usuária, quero alternar para inglês | M | S | seletor de idioma; EN completo; persiste |
| 8.3 | Como usuária, quero escolher o tema | S | S | dark (default) / light / system |
| 8.4 | Como usuária, quero uma tela "Sobre/Privacidade" | S | XS | explica local-first e zero rastreio |

## E9 — Gastos com livros (Budget)  _(Could — v1.2+)_

| # | História | Prio | Est. | Critérios de aceite |
|---|----------|------|------|---------------------|
| 9.1 | Como usuária, quero registrar quanto gastei num livro | C | S | campo preço/moeda no livro |
| 9.2 | Como usuária, quero um "Budget Overview" | C | L | donut por categoria + barras por mês (IMG_0918) |
| 9.3 | Como usuária, quero definir orçamento mensal | C | M | meta de gasto + alerta visual |

## E10 — Expansão social/curadoria  _(Won't agora)_

| # | História | Prio | Est. |
|---|----------|------|------|
| 10.1 | Coleções/tags personalizadas ("TBR de verão") | C | M |
| 10.2 | Compartilhar estante como imagem (story-ready) | C | M |
| 10.3 | Sync na nuvem opcional (multi-dispositivo) | W | XL |
| 10.4 | Recomendações por gênero/histórico | W | L |
| 10.5 | Import de Goodreads/Skoob (CSV) | C | M |

---

## Definição de Pronto (DoD)

Uma história está "pronta" quando:
- Atende aos critérios de aceite e funciona offline (quando aplicável).
- Tem strings em PT-BR **e** EN (sem texto cru no código).
- Segue os tokens do design system e passa em acessibilidade básica (axe).
- Tem testes onde faz sentido (lógica de dados/fluxo crítico).
- Passa lint/typecheck/build no CI.
- Responsiva (mobile-first) e com estados de loading/erro/vazio.

## Próximos passos sugeridos

1. **Validar esta documentação** com você (ajustes de visão/escopo/nome).
2. **Protótipo visual** das telas-núcleo (Estante + Detalhe do livro) — pode ser
   um Artifact navegável antes do código.
3. **Scaffold técnico** (E1) + primeira fatia vertical: buscar → adicionar → ver na
   estante → escrever nota (E2+E3+E4 mínimos).
4. Iterar até o MVP fechar, então decidir v1.1.
