# 📄 Como Adicionar PDFs aos Modelos TP Internos

## 📋 Status Atual

✅ **Imagens baixadas**: 11 modelos de TP Internos
✅ **Galeria criada**: Imagens exibidas na página
⏳ **PDFs pendentes**: Precisa adicionar os PDFs correspondentes

---

## 🎯 Modelos Disponíveis

Os seguintes modelos estão configurados e prontos para receber PDFs:

1. **IPSK**
2. **IPSH**
3. **IPSBF**
4. **IPSG-FT**
5. **IPSG-FF**
6. **IPSGF**
7. **IPSD**
8. **IPSB-24**
9. **IPSB**
10. **IPS-2A**
11. **IPSA**

---

## 📝 Como Adicionar os PDFs

### Opção 1: Adicionar PDFs Localmente

1. **Criar pasta para PDFs:**
   ```
   public/pdfs/tp-internos/
   ```

2. **Adicionar os arquivos PDF:**
   - Nomeie os arquivos seguindo o padrão: `ipsk.pdf`, `ipsh.pdf`, etc.
   - Coloque na pasta: `public/pdfs/tp-internos/`

3. **Atualizar o arquivo de dados:**
   - Abra: `app/produtos/transformadores-instrumentos/tp-internos-data.ts`
   - Adicione o caminho do PDF em cada modelo:
   ```typescript
   {
     id: 'ipsk',
     name: 'IPSK',
     image: '/images/produtos/instrumentos/tp-internos/tp-interno-2.jpg',
     pdf: '/pdfs/tp-internos/ipsk.pdf' // ← Adicione aqui
   },
   ```

### Opção 2: Usar URLs Externas

Se os PDFs estão hospedados em outro lugar:

1. **Atualizar o arquivo de dados:**
   ```typescript
   {
     id: 'ipsk',
     name: 'IPSK',
     image: '/images/produtos/instrumentos/tp-internos/tp-interno-2.jpg',
     pdf: 'https://exemplo.com/pdfs/ipsk.pdf' // ← URL externa
   },
   ```

---

## 🔍 Como Encontrar os PDFs no Site Wix

1. **Acesse a página:**
   - https://zilmertransformado.wixsite.com/zilmer/tp-internos

2. **Encontre os links de PDF:**
   - Clique em cada modelo na página
   - Ou use F12 > Network > Filtro "Doc" ou "PDF"
   - Recarregue a página e procure por requisições de PDF

3. **Copie as URLs dos PDFs**

4. **Adicione no arquivo de dados** conforme mostrado acima

---

## ✅ Após Adicionar os PDFs

1. **Recarregue a página:**
   - http://localhost:3000/produtos/transformadores-instrumentos

2. **Verifique:**
   - Cada imagem deve ter um badge "PDF" no canto superior direito
   - Ao clicar na imagem, deve abrir o PDF em nova aba

---

## 📁 Estrutura de Arquivos

```
public/
  pdfs/
    tp-internos/
      ipsk.pdf
      ipsh.pdf
      ipsbf.pdf
      ...
```

---

## 💡 Dica

Se você tiver os PDFs mas não souber qual é qual, você pode:
1. Abrir cada PDF
2. Verificar o nome do modelo no conteúdo
3. Associar ao modelo correto no arquivo de dados

---

## 🆘 Precisa de Ajuda?

Se você encontrar os PDFs no site Wix, me envie as URLs e eu posso:
1. Baixar os PDFs automaticamente
2. Atualizar o arquivo de dados
3. Configurar tudo para você


