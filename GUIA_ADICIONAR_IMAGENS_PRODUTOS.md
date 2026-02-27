# Guia: Como Adicionar Imagens nas Páginas de Produtos

## 📁 Estrutura de Pastas

### Transformadores Imersos em Óleo
As imagens devem ser colocadas em: `public/images/produtos/oleo/`

**Subpastas disponíveis:**
- `autotransformadores/` - Para autotransformadores padrão
- `de-aterramento/` - Para transformadores de aterramento
- `de-partida/` - Para autotransformadores de partida
- `para-fornos/` - Para transformadores para fornos
- `para-retificadores/` - Para transformadores retificadores
- `reatores/` - Para reatores
- `transformadores-auxiliares/` - Para transformadores auxiliares
- `transformadores-de-forca/36kv/` - Para transformadores de força 36kV
- `transformadores-de-forca/69kv/` - Para transformadores de força 69kV

### Transformadores a Seco
As imagens devem ser colocadas em: `public/images/produtos/seco/`

**Subpastas disponíveis:**
- `baixa-tensao/` - Para transformadores TAI e TCI
- `media-tensao/` - Para transformadores de média tensão
- `retificadores/` - Para transformadores retificadores
- `aterramento/` - Para transformadores de aterramento

---

## 📝 Como Adicionar Imagens

### 1. Transformadores Imersos em Óleo

**Arquivo:** `app/produtos/transformadores-oleo/[slug]/page.tsx`

**Localização:** Linha 7-43, dentro do objeto `products`

**Exemplo - Adicionar múltiplas imagens:**

```typescript
'para-retificadores': {
  title: 'TRANSFORMADORES PARA RETIFICADORES EM ÓLEO',
  longDescription: `...`,
  images: [
    '/images/produtos/oleo/para-retificadores/imagem1.png',
    '/images/produtos/oleo/para-retificadores/imagem2.png',
    '/images/produtos/oleo/para-retificadores/imagem3.png',
  ],
},
```

**Produtos disponíveis e suas pastas:**
- `transformadores-auxiliares` → `transformadores-auxiliares/`
- `para-retificadores` → `para-retificadores/`
- `para-fornos` → `para-fornos/`
- `de-partida` → `de-partida/`
- `de-aterramento` → `de-aterramento/`
- `autotransformadores` → `autotransformadores/`
- `reatores` → `reatores/`

---

### 2. Transformadores a Seco

**Arquivo:** `app/produtos/transformadores-seco/[slug]/page.tsx`

**Localização:** Linha 15-39, dentro do objeto `products`

**Exemplo - Adicionar múltiplas imagens:**

```typescript
'media-tensao': {
  title: 'TRANSFORMADORES A SECO DE MÉDIA TENSÃO',
  longDescription: `...`,
  images: [
    '/images/produtos/seco/media-tensao/imagem1.png',
    '/images/produtos/seco/media-tensao/imagem2.png',
    '/images/produtos/seco/media-tensao/imagem3.png',
  ],
},
```

**Produtos disponíveis e suas pastas:**
- `media-tensao` → `media-tensao/`
- `para-retificadores` → `retificadores/`
- `aterramento` → `aterramento/`
- `baixa-tensao` → `baixa-tensao/`

---

## 🔧 Passo a Passo

### Passo 1: Colocar as imagens na pasta correta
1. Copie suas imagens para a pasta apropriada em `public/images/produtos/oleo/` ou `public/images/produtos/seco/`
2. Use a subpasta correspondente ao tipo de produto

### Passo 2: Atualizar o código
1. Abra o arquivo correspondente:
   - `app/produtos/transformadores-oleo/[slug]/page.tsx` (para óleo)
   - `app/produtos/transformadores-seco/[slug]/page.tsx` (para seco)

2. Localize o produto desejado dentro do objeto `products`

3. Atualize o array `images` com os caminhos das suas imagens:

```typescript
images: [
  '/images/produtos/oleo/nome-da-pasta/imagem1.png',
  '/images/produtos/oleo/nome-da-pasta/imagem2.png',
],
```

### Passo 3: Verificar
- Os caminhos começam com `/images/produtos/`
- A extensão do arquivo está correta (.png, .jpg, .jpeg, etc.)
- O caminho corresponde à localização real do arquivo

---

## 📌 Observações Importantes

1. **Caminhos:** Sempre use caminhos relativos começando com `/images/produtos/`
2. **Formato:** Suporta .png, .jpg, .jpeg, .webp
3. **Múltiplas imagens:** Você pode adicionar quantas imagens quiser no array
4. **Ordem:** A primeira imagem será exibida como principal na galeria
5. **Nomes de arquivo:** Use nomes descritivos e evite espaços (use hífens ou underscores)

---

## 🎯 Exemplo Completo

**Antes:**
```typescript
'para-retificadores': {
  title: 'TRANSFORMADORES PARA RETIFICADORES EM ÓLEO',
  longDescription: `...`,
  images: ['/images/produtos/oleo/retificadores.jpg'],
},
```

**Depois (com múltiplas imagens):**
```typescript
'para-retificadores': {
  title: 'TRANSFORMADORES PARA RETIFICADORES EM ÓLEO',
  longDescription: `...`,
  images: [
    '/images/produtos/oleo/para-retificadores/TAM-SIEMENS-11300-kVA-v1.png',
    '/images/produtos/oleo/para-retificadores/TAM-SIEMENS-11300-kVA-v2.png',
    '/images/produtos/oleo/para-retificadores/TAM-SIEMENS-11300-kVA-v3.png',
    '/images/produtos/oleo/para-retificadores/TAM-SIEMENS-4700-kVA-v1.png',
    '/images/produtos/oleo/para-retificadores/TAM-SIEMENS-4700-kVA-v2.png',
  ],
},
```

---

## ✅ Checklist

- [ ] Imagens copiadas para a pasta correta
- [ ] Caminhos atualizados no código
- [ ] Caminhos começam com `/images/produtos/`
- [ ] Extensões dos arquivos estão corretas
- [ ] Testado no navegador após salvar


















