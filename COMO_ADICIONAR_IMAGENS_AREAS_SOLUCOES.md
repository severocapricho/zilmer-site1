# 🖼️ Como Adicionar Imagens na Seção "Áreas de Atuação e Soluções"

## 📍 Localização da Seção

A seção "Áreas de Atuação e Soluções" aparece na **homepage** logo após o hero com carrossel. É uma seção interativa onde o usuário pode passar o mouse sobre as categorias no menu lateral direito para ver diferentes imagens e informações.

## 📁 Estrutura de Pastas

As imagens devem ser colocadas na seguinte pasta:

```
public/images/areas/
```

## 📋 Imagens Necessárias

Você precisa adicionar **6 imagens**, uma para cada área de atuação:

1. **transporte.jpg** - Imagem relacionada a transporte ferroviário/metrôs
2. **hidreletrica.jpg** - Imagem relacionada a usinas hidrelétricas
3. **mineracao.jpg** - Imagem relacionada a mineração
4. **subestacoes.jpg** - Imagem relacionada a subestações elétricas
5. **energias-renovaveis.jpg** - Imagem relacionada a energia eólica/solar
6. **controle-medicao.jpg** - Imagem relacionada a controle e medição

## 🎨 Especificações das Imagens

### Tamanho e Formato:
- **Formato:** JPG ou PNG
- **Tamanho recomendado:** 1920x1080px (Full HD) ou maior
- **Proporção:** 16:9 (widescreen) - horizontal
- **Qualidade:** Alta resolução, otimizada para web

### Características:
- **Orientação:** Horizontal (landscape)
- **Peso:** Otimize as imagens antes de adicionar (use ferramentas como TinyPNG)
- **Conteúdo:** Imagens que representem bem cada área de atuação

## 📝 Passo a Passo

### 1. Preparar as Imagens

1. **Selecione as imagens** que representam cada área:
   - Transporte: trens, metrôs, sistemas de transporte
   - Hidrelétrica: barragens, turbinas, usinas
   - Mineração: equipamentos, minas, operações
   - Subestações: torres, infraestrutura elétrica
   - Energias Renováveis: parques eólicos, painéis solares
   - Controle e Medição: painéis, instrumentos, sistemas

2. **Renomeie as imagens** exatamente como especificado:
   - `transporte.jpg`
   - `hidreletrica.jpg`
   - `mineracao.jpg`
   - `subestacoes.jpg`
   - `energias-renovaveis.jpg`
   - `controle-medicao.jpg`

3. **Otimize as imagens**:
   - Redimensione para 1920x1080px ou proporção similar
   - Comprima usando ferramentas como TinyPNG ou ImageOptim
   - Mantenha boa qualidade visual

### 2. Criar a Pasta (se não existir)

A pasta deve estar em:
```
public/images/areas/
```

Se a pasta não existir, crie-a manualmente ou execute no terminal:

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "public\images\areas"
```

**Mac/Linux:**
```bash
mkdir -p public/images/areas
```

### 3. Adicionar as Imagens

1. **Copie as 6 imagens** para a pasta `public/images/areas/`
2. **Verifique os nomes** - devem ser exatamente como listado acima
3. **Confirme que os arquivos estão corretos**

### 4. Verificar se Funciona

1. **Inicie o servidor** (se ainda não estiver rodando):
   ```bash
   npm run dev
   ```

2. **Acesse a homepage**: `http://localhost:3000`

3. **Role até a seção** "Áreas de Atuação e Soluções"

4. **Teste a interatividade**:
   - Passe o mouse sobre cada categoria no menu lateral direito
   - A imagem de fundo deve mudar com um fade suave
   - O texto também deve atualizar

## ✅ Estrutura Final Esperada

```
public/
└── images/
    └── areas/
        ├── transporte.jpg
        ├── hidreletrica.jpg
        ├── mineracao.jpg
        ├── subestacoes.jpg
        ├── energias-renovaveis.jpg
        └── controle-medicao.jpg
```

## 🔧 Personalização Avançada

### Alterar Textos das Áreas

Se quiser alterar os textos (títulos, descrições), edite o arquivo:
```
components/AreasAtuacao.tsx
```

Procure pelo array `areasAtuacao` e edite os campos:
- `title`: Nome da categoria (aparece no menu)
- `projectTitle`: Título do projeto (aparece no texto principal)
- `projectDescription`: Descrição do projeto
- `image`: Caminho da imagem (já configurado, não precisa mudar)

### Adicionar Novas Áreas

Para adicionar uma nova área:

1. **Adicione a imagem** na pasta `public/images/areas/` com o nome desejado
2. **Edite** `components/AreasAtuacao.tsx`
3. **Adicione um novo objeto** no array `areasAtuacao`:

```typescript
{
  id: 'nova-area',
  title: 'Nova Área',
  description: 'Descrição da nova área',
  image: '/images/areas/nova-area.jpg',
  projectTitle: 'Título do Projeto',
  projectDescription: 'Descrição detalhada do projeto',
  projects: [
    'Item 1',
    'Item 2',
    'Item 3'
  ]
}
```

### Alterar Cores do Overlay

O overlay escuro sobre a imagem pode ser ajustado em:
```
components/AreasAtuacao.module.css
```

Procure por `.imageOverlay` e ajuste a cor/opacidade:

```css
.imageOverlay {
  background: rgba(0, 51, 102, 0.6); /* Ajuste o último valor (0.6) para mais/menos escuro */
}
```

## 💡 Dicas Importantes

### Escolha de Imagens:
- ✅ Use imagens de alta qualidade que representem bem cada área
- ✅ Imagens com boa iluminação funcionam melhor com o overlay escuro
- ✅ Evite imagens com muito texto, pois serão ofuscadas pelo overlay
- ✅ Prefira imagens horizontais (landscape) para melhor visualização

### Performance:
- ⚡ Otimize as imagens antes de adicionar (reduza o tamanho do arquivo)
- ⚡ Use formato JPG para fotos (menor tamanho)
- ⚡ Use formato PNG apenas se precisar de transparência

### Teste:
- 🧪 Sempre teste após adicionar novas imagens
- 🧪 Verifique se os nomes dos arquivos estão corretos (case-sensitive)
- 🧪 Confirme que as imagens aparecem corretamente em diferentes tamanhos de tela

## 🐛 Solução de Problemas

### Imagem não aparece:
1. Verifique se o nome do arquivo está **exatamente** como especificado
2. Confirme que o arquivo está na pasta correta: `public/images/areas/`
3. Verifique a extensão do arquivo (.jpg ou .png)
4. Recarregue a página com Ctrl+F5 (limpar cache)

### Imagem aparece cortada:
- A imagem deve ter proporção 16:9 (widescreen)
- Tamanho mínimo recomendado: 1920x1080px
- Use `object-fit: cover` no CSS (já configurado)

### Transição não funciona:
- Verifique se o JavaScript está habilitado no navegador
- Confirme que o servidor está rodando corretamente
- Verifique o console do navegador para erros

## 📞 Próximos Passos

Após adicionar as imagens:
1. ✅ Teste todas as categorias
2. ✅ Verifique em diferentes tamanhos de tela (responsivo)
3. ✅ Confirme que as transições estão suaves
4. ✅ Valide que os textos estão legíveis sobre as imagens

---

**Nota:** As imagens são carregadas dinamicamente quando o usuário passa o mouse sobre cada categoria, proporcionando uma experiência interativa e envolvente.


























