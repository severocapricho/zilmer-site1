// Script para ajudar a encontrar URLs de imagens no site Wix
// Execute este script e ele abrirá o site e mostrará instruções

console.log(`
🔍 ENCONTRE AS URLS DAS IMAGENS:

1. Abra o site: https://zilmertransformado.wixsite.com/zilmer/produtos
2. Navegue até "Transformadores para Instrumentos"
3. Pressione F12 para abrir DevTools
4. Vá na aba "Network" (Rede)
5. Clique no filtro "Img" (para mostrar apenas imagens)
6. Recarregue a página (F5)
7. As imagens aparecerão na lista
8. Clique em cada imagem para ver sua URL

📋 URLs que você precisa encontrar:
- TP Interno
- TP Externo  
- TC Interno
- TC Externo

💡 DICA: As URLs geralmente começam com:
   - static.wixstatic.com
   - images-wixmp
   - media.wixstatic.com

📝 Depois, cole as URLs no arquivo: scripts/download-images.js
`);





