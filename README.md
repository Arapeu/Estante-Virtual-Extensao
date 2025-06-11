# Catálogo de Livros Educativos

Este projeto é um sistema web para exibição de um catálogo de livros e materiais educativos, com foco em comunidades e níveis de acesso diferenciados (público geral, alunos e professores).

---

## Visão Geral

O sistema permite que qualquer usuário visualize todos os livros disponíveis no catálogo. Cada livro exibe informações básicas como título, autor, comunidade, tags e uma indicação do nível de acesso (ex: disponível apenas para alunos, apenas para professores ou para todos).

O projeto está desenvolvido em React com Next.js (modo client-side) e utiliza componentes estilizados personalizados para UI.

---

## Páginas Principais

- **Catálogo de Livros (`PaginaCatalogo`)**  
  Exibe a lista de livros com filtros por comunidade, busca por título/autor/comunidade, e indicação do nível de acesso de cada livro.

- **Layout**  
  Componentes de cabeçalho (`Cabecalho`) e rodapé (`Rodape`) usados em todas as páginas.

---

## Funcionalidades Implementadas

- Listagem de livros com dados estáticos para demonstração.
- Busca textual por título, autor e comunidade.
- Filtro por comunidades (ex: Tecnologia, História, Matemática, etc).
- Exibição do nível de acesso em cada livro (Público, Alunos, Professores).
- Interface responsiva básica.
- Componentes reutilizáveis para UI (Cards, Botões, Badges, Inputs).
- Indicadores visuais e botões “Ver Mais” e “Download” (sem funcionalidade implementada ainda).

---

## Próximos Passos / Sugestões para Continuação

- Implementar autenticação de usuários (alunos, professores, público).
- Controlar acesso real a conteúdos e downloads.
- Criar página ou modal de detalhes completos do livro ao clicar em “Ver Mais”.
- Integrar backend/API para carregar livros dinamicamente.
- Melhorar UI/UX e responsividade.
- Implementar paginação ou carregamento incremental.
- Adicionar busca avançada e filtros por tags, níveis de acesso, etc.

---

## Tecnologias Utilizadas

- React
- Next.js (App Router com `use client`)
- Tailwind CSS para estilização
- Biblioteca `lucide-react` para ícones
- Componentes customizados para UI (cards, botões, badges)

---

## Como Rodar Localmente

1. Clone o repositório:
   
   git clone <URL_DO_REPOSITÓRIO>
   cd nome-do-projeto

2. Instale as dependências:

    npm run dev
    # ou
    yarn dev

3. Execute o servidor de desenvolvimento:
    npm run dev
    # ou
    yarn dev

4. Acesse http://localhost:3000 no navegador.
