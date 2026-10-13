# ENSA - Portal Explosão Naruto Shippuden em Angola 🌀🇦🇴

O **ENSA** é um portal geek e otaku de alta fidelidade dedicado aos fãs da franquia Naruto em Angola e no mundo. O portal integra notícias em tempo real, artigos interativos, quizzes com gamificação, Wiki completa do universo ninja, calendário de lançamentos e um poderoso painel administrativo para controle total do ecossistema.

Este portal foi concebido utilizando tecnologias modernas de desenvolvimento full-stack (**React 19**, **Vite**, **Express**, **Tailwind CSS v4** e **Motion**), proporcionando uma experiência de utilizador rápida, fluida e totalmente responsiva.

---

## 🎨 Funcionalidades Principais

### 1. Sistema de Temas (Claro / Escuro) 🌗
* **Tema Padrão**: Escuro (Preserva a identidade icônica e misteriosa de Naruto).
* **Alternador Inteligente**: Localizado no componente de navegação superior (`Navigation`), permitindo alternar de maneira instantânea e elegante.
* **Persistência**: Utiliza `localStorage` para recordar a preferência do utilizador nas próximas visitas.
* **Tailwind v4**: Integração perfeita via classe `.dark` aplicada ao elemento raiz, gerenciando variáveis CSS customizadas para cores de fundo e textos.

### 2. Sincronização e Fallback de Avatares (`UserAvatar`) 👤
* **Padronização Visual**: Componente centralizado para renderização de fotos de utilizadores e administradores em todo o portal.
* **Fase de Desenvolvimento**: Atualmente substituindo fotos reais por um ícone estilizado de utilizador em tom laranja (`ensa-orange`) para manter um visual uniforme.
* **Fallback Automático**: Caso um utilizador não possua foto cadastrada, o ícone serve como avatar padrão.
* **Sincronismo**: Aplicado na navegação, comentários do artigo, repostas, carrossel de destaques e feeds de notícias.

### 3. Navegação Dinâmica & Gamificação (`Navigation`) 🏆
* **Barra Superior Multifuncional**: Inclui links de abas rápidos, logótipo personalizado com insígnia de Angola e área do utilizador.
* **Widget de Nível e XP**: Exibe o nível atual, a barra de progresso animada e a pontuação de XP do utilizador logado.
* **Seletor de Administradores**: Permite simular a navegação entre diferentes perfis de administradores do ecossistema para validação e testes rápidos.

### 4. Leitor e Visualizador de Artigos (`ArticleView`) 📖
* **Leitura Imersiva**: Apresentação de notícias completas com imagens de alta qualidade e tipografia otimizada.
* **Interações Sociais**: Avaliação por curtidas (like/dislike) e sistema de comentários hierárquicos com suporte a respostas em múltiplos níveis.
* **Acessibilidade (Text-To-Speech)**: Funcionalidade de leitura de áudio para ouvir o conteúdo do artigo.
* **Publicidade Integrada**: Áreas dedicadas para exibição de anúncios configurados diretamente pelo painel administrativo.

### 5. Quizzes Interativos (`QuizzesAndGamification`) 🧠
* **Central de Desafios**: Quizzes categorizados com questões temáticas do universo Naruto.
* **Leaderboard Global**: Tabela classificativa em tempo real com os ninjas mais bem pontuados da comunidade.
* **Conquistas e Recompensas**: Medalhas e insígnias conquistadas por mérito (como sequências diárias ou pontuação perfeita).

### 6. Wiki e Calendário de Lançamentos (`WikiAndCalendar`) 📅
* **Enciclopédia Ninja**: Informações detalhadas sobre Personagens, Jutsus, Clãs e Vilas Ocultas.
* **Calendário de Lançamentos**: Acompanhamento mensal de episódios, capítulos de mangá e jogos, com notificações locais e contagem regressiva para estreias.

### 7. Painel de Administração (`AdminPanel`) 🛠️
* **Gestão de Conteúdo**: Criação, edição e remoção de artigos e posts de notícias.
* **Moderação de Comentários**: Lista centralizada para aprovar ou remover comentários de utilizadores.
* **Configuração de Ads**: Controle dinâmico sobre banners e posicionamento de publicidades do portal.
* **Banco de Perguntas**: Gestão de quizzes e inserção de novos desafios.
* **Métricas do Sistema**: Gráficos e indicadores de acessos, atividade e novos utilizadores registados.

---

## 🏗️ Estrutura de Pastas e Arquivos

O portal é estruturado de forma modular e altamente escalável:

```bash
├── assets/                  # Recursos estáticos (Imagens, logos, etc.)
├── server.ts                # Servidor Express Full-stack (Desenvolvimento e API)
├── package.json             # Dependências e scripts do ecossistema
├── tsconfig.json            # Configurações do compilador TypeScript
├── vite.config.ts           # Configuração de bundler e plugins do Vite
│
└── src/
    ├── main.tsx             # Ponto de entrada do React
    ├── App.tsx              # Componente principal / Gerenciamento de Estado Global
    ├── index.css            # Estilos CSS, Variáveis e configuração do Tailwind v4
    ├── types.ts             # Tipagens estritas do TypeScript para o ecossistema
    │
    └── components/          # Componentes reutilizáveis
        ├── Navigation.tsx            # Header com navegação e controle de tema
        ├── UserAvatar.tsx            # Componente de foto/avatar unificado
        ├── HeroSlider.tsx            # Carrossel de notícias em destaque
        ├── ArticleView.tsx           # Leitor de notícias e comentários
        ├── QuizzesAndGamification.tsx # Sistema de quizzes e leaderboard
        ├── WikiAndCalendar.tsx       # Wiki de Naruto e calendário de estreias
        └── AdminPanel.tsx            # Painel do Administrador e estatísticas
```

---

## 🛠️ Tecnologias Utilizadas

* **React 19** - Biblioteca declarativa para construção de interfaces.
* **Vite** - Build tool ultra-rápido para desenvolvimento frontend.
* **Express** - Servidor backend para disponibilização de APIs de forma robusta.
* **Tailwind CSS v4** - Framework de estilização baseado em classes utilitárias e variáveis CSS nativas.
* **Motion** - Biblioteca de animações performáticas e fluidas para transições de interface.
* **Lucide React** - Conjunto de ícones vetoriais modernos e consistentes.
* **TypeScript** - Superset que adiciona tipagem estática e segurança ao código.

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para preparar o ambiente e rodar o portal ENSA:

### 1. Instalar as Dependências
No terminal do projeto, execute o comando abaixo para baixar e instalar as dependências necessárias:
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
Inicie o servidor local integrado (Express + Vite) com suporte a recarga automática:
```bash
npm run dev
```
O portal estará disponível em `http://localhost:3000`.

### 3. Compilar para Produção
Para criar um pacote otimizado e compilado pronto para deployment:
```bash
npm run build
```
O comando gerará os arquivos estáticos na pasta `dist/` e compilará o servidor backend no arquivo `dist/server.cjs`.

### 4. Executar em Produção
Após realizar o build, você pode executar o portal no modo produção através do comando:
```bash
npm start
```

---

## 🔒 Variáveis de Ambiente

Todas as chaves secretas ou variáveis públicas devem ser documentadas em `.env.example`. Crie um arquivo `.env` local caso precise ajustar portas ou integrar serviços de terceiros.
