# Neurostore

## Introdução

O **Neurostore** é um projeto inovador que tem como objetivo tornar a navegação em e-commerces mais acessível e intuitiva para todos, especialmente pessoas com mobilidade reduzida ou limitações motoras. Através do uso de gestos realizados com as mãos, o usuário pode controlar o site de forma natural, sem a necessidade de teclado ou mouse. O Neurostore busca proporcionar autonomia e inclusão digital, trazendo uma experiência de compra mais fluida e adaptada às necessidades dos usuários.

## Estrutura de Pastas

A estrutura do repositório foi organizada para facilitar a escalabilidade e a manutenção do projeto. As principais pastas e arquivos são:

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

## Controle por Gestos

O Neurostore implementa uma série de gestos com as mãos para controlar o site de maneira clara e intuitiva. Os gestos mapeados atualmente são:

- **Arrastar para a direita/esquerda:** Navega entre os diferentes produtos ou páginas.
- **Mão aberta:** Seleciona ou ativa o item focado na tela.
- **Mão fechada (punho):** Volta para a página anterior ou cancela uma ação.
- **Pinça (união do polegar e indicador):** Adiciona o produto ao carrinho.
- **Dois dedos para cima/baixo:** Realiza rolagem na página, permitindo visualizar mais produtos.
- **Gestos personalizados:** O sistema permite adaptar gestos para ações específicas conforme necessidade do usuário.

Esses gestos foram pensados para serem intuitivos e de fácil execução, tornando a navegação mais acessível e prática.

---
