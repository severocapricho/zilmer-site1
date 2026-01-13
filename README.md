# Site Zilmer Transformadores

Site moderno e responsivo para a Zilmer Transformadores, desenvolvido com Next.js.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Build para Produção

Para criar uma versão estática do site:

```bash
npm run build
```

Os arquivos estáticos estarão na pasta `out/`.

## 🌐 Deploy

Este site pode ser facilmente deployado em:

- **Vercel** (recomendado para Next.js):
  - Conecte seu repositório GitHub
  - O Vercel detectará automaticamente e fará o deploy

- **Netlify**:
  - Arraste a pasta `out/` após o build
  - Ou conecte via Git para deploy automático

- **GitHub Pages**:
  - Faça o build: `npm run build`
  - Faça upload da pasta `out/` para o GitHub Pages

### Conectar Domínio

1. Após fazer o deploy, acesse as configurações de domínio na plataforma escolhida
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme as instruções da plataforma
4. Seu site estará acessível pelo seu domínio!

## 📁 Estrutura do Projeto

```
├── app/                    # Páginas e rotas (App Router do Next.js)
│   ├── sobre/             # Páginas sobre a empresa
│   ├── produtos/          # Páginas de produtos
│   └── contato/           # Página de contato
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho com navegação
│   └── Footer.tsx         # Rodapé
└── public/                # Arquivos estáticos (imagens, etc.)
```

## 🎨 Personalização

- **Cores**: Edite as variáveis CSS em `app/globals.css`
- **Conteúdo**: Edite os arquivos em `app/` para modificar o conteúdo das páginas
- **Logo**: Adicione sua logo em `public/logoaba4.png`

## 📝 Notas Importantes

- O site está configurado para exportação estática (`output: 'export'` no `next.config.js`)
- **LOGO**: Adicione o arquivo `logoaba4.png` na pasta `public/` para que o logo apareça no cabeçalho
- Todas as imagens devem ser otimizadas antes de adicionar ao projeto
- O site está totalmente em português brasileiro
- Design moderno e responsivo, inspirado em sites profissionais do setor

## 🔧 Tecnologias Utilizadas

- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS Modules
- Design responsivo e moderno

