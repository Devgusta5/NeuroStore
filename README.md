# Neurostore

## Introdução

O **Neurostore** é uma plataforma SaaS inovadora, criada para funcionar como um “Bootstrap” voltado ao desenvolvimento de código e redes neurais. Seu propósito é oferecer uma base robusta e flexível para projetos que demandam agilidade, modularidade e integração com inteligência artificial, facilitando tanto o desenvolvimento quanto o deploy de soluções baseadas em machine learning e deep learning.

Além disso, o Neurostore busca democratizar o acesso à tecnologia, promovendo inclusão digital por meio de interfaces acessíveis e adaptáveis — especialmente para pessoas com mobilidade reduzida. O projeto entrega uma experiência única, onde o usuário pode navegar, interagir e gerenciar conteúdos usando apenas gestos das mãos, sem a necessidade de teclado ou mouse.

## Estrutura de Pastas

```
├── app/                 # Lógica de inicialização e rotas principais do projeto
├── components/          # Componentes reutilizáveis da interface
├── hooks/               # Hooks customizados para manipulação de estados e gestos
├── lib/                 # Funções e utilitários compartilhados (bibliotecas)
├── public/              # Arquivos estáticos (imagens, ícones, etc)
├── styles/              # Estilos globais e temas do projeto
├── .gitignore           # Arquivos e pastas ignorados pelo Git
├── components.json      # Configuração dos componentes
├── next.config.mjs      # Configurações do Next.js
├── package.json         # Dependências e scripts do projeto
├── postcss.config.js    # Configuração do PostCSS
├── tailwind.config.js   # Configuração do Tailwind CSS
├── tsconfig.json        # Configuração do TypeScript
```

## Controle por Gestos 🖐️🤲✊

O Neurostore implementa gestos com as mãos para controlar o site de maneira clara e intuitiva, tornando a experiência acessível para todos:

- 🖐️ **Mão aberta:** Navega entre as páginas da navbar.
- 🤏 **Pinça (polegar e indicador):** Simula um clique.
- 🤏 **Pinça (polegar e médio):** Scroll leve.
- 👐 **Gestos personalizados:** O sistema pode ser adaptado para gestos específicos conforme necessidade do usuário.

Esses gestos foram pensados para serem intuitivos e de fácil execução, tornando a navegação mais acessível, prática e divertida.

## Instalação e Execução

### 1. Clonando o projeto

```bash
git clone https://github.com/Devgusta5/NeuroStore.git
cd NeuroStore
```

### 2. Instalando dependências

O projeto utiliza Node.js, Next.js e Tailwind CSS. Para instalar as dependências, use o gerenciador de sua preferência:

#### Usando npm

```bash
npm install
```

#### Usando pnpm

```bash
pnpm install
```

#### Usando yarn

```bash
yarn install
```

### 3. Dependências para reconhecimento de gestos

O Neurostore utiliza o [MediaPipe](https://google.github.io/mediapipe/) para reconhecimento de gestos. Para garantir o funcionamento, instale o pacote mediapipe:

```bash
npm install @mediapipe/hands @mediapipe/camera_utils @mediapipe/drawing_utils
```
Ou use o equivalente para pnpm/yarn.

> **Obs:** O MediaPipe pode ser usado tanto via npm quanto via CDN em alguns módulos front-end. Verifique na implementação qual abordagem foi utilizada.

### 4. Rodando o projeto em ambiente de desenvolvimento

```bash
npm run dev
```
ou
```bash
pnpm dev
```
ou
```bash
yarn dev
```

O projeto estará disponível em `http://localhost:3000`.

---
