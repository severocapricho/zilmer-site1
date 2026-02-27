const fs = require('fs');
const path = require('path');

// Mapeamento de slugs para URLs nos cards
const slugToCardMap = {
  'seco': {
    'para-retificadores': '/produtos/transformadores-seco/para-retificadores',
    'aterramento': '/produtos/transformadores-seco/aterramento',
    'baixa-tensao': '/produtos/transformadores-seco/baixa-tensao',
  },
  'oleo': {
    'para-retificadores': '/produtos/transformadores-oleo/para-retificadores',
    'para-fornos': '/produtos/transformadores-oleo/para-fornos',
    'de-partida': '/produtos/transformadores-oleo/de-partida',
    'de-aterramento': '/produtos/transformadores-oleo/de-aterramento',
    'autotransformadores': '/produtos/transformadores-oleo/autotransformadores',
    'reatores': '/produtos/transformadores-oleo/reatores',
  }
};

/**
 * Extrai o primeiro array de imagens de um produto específico
 */
function getFirstImageFromProduct(filePath, productSlug) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Encontra o bloco do produto
  const productRegex = new RegExp(
    `('${productSlug}'|"${productSlug}"):\\s*\\{[\\s\\S]*?images:\\s*\\[([\\s\\S]*?)\\]`,
    'm'
  );

  const match = content.match(productRegex);
  if (!match || !match[2]) {
    return null;
  }

  // Extrai as imagens do array
  const imagesArray = match[2];
  const imageMatches = imagesArray.match(/'([^']+)'/g);
  
  if (!imageMatches || imageMatches.length === 0) {
    return null;
  }

  // Retorna a primeira imagem (remove as aspas)
  return imageMatches[0].replace(/'/g, '');
}

/**
 * Atualiza a imagem src em um card específico na página de listagem
 */
function updateCardImage(filePath, href, newImageSrc) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Encontra o Link com o href específico e atualiza o src da Image dentro dele
  // Procura por padrões como: <Link href="...href..."> ... <Image src="..." />
  const linkRegex = new RegExp(
    `(<Link[^>]*href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*>[\\s\\S]*?<Image[^>]*src=["'])([^"']+)(["'][^>]*>)`,
    'm'
  );

  const match = content.match(linkRegex);
  if (!match) {
    console.log(`⚠ Card não encontrado para: ${href}`);
    return false;
  }

  // Substitui o src da imagem
  content = content.replace(linkRegex, `$1${newImageSrc}$3`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Atualizado card: ${href} → ${newImageSrc}`);
  return true;
}

/**
 * Processa cards de transformadores a seco
 */
function processSecoCards() {
  const detailFilePath = path.join(__dirname, '../app/produtos/transformadores-seco/[slug]/page.tsx');
  const listFilePath = path.join(__dirname, '../app/produtos/transformadores-seco/page.tsx');

  console.log('\n📁 Processando Cards de Transformadores a Seco...');

  for (const [slug, href] of Object.entries(slugToCardMap.seco)) {
    const firstImage = getFirstImageFromProduct(detailFilePath, slug);
    
    if (firstImage) {
      updateCardImage(listFilePath, href, firstImage);
    } else {
      console.log(`⚠ Nenhuma imagem encontrada para: ${slug}`);
    }
  }
}

/**
 * Processa cards de transformadores imersos em óleo
 */
function processOleoCards() {
  const detailFilePath = path.join(__dirname, '../app/produtos/transformadores-oleo/[slug]/page.tsx');
  const listFilePath = path.join(__dirname, '../app/produtos/transformadores-oleo/page.tsx');

  console.log('\n📁 Processando Cards de Transformadores Imersos em Óleo...');

  for (const [slug, href] of Object.entries(slugToCardMap.oleo)) {
    const firstImage = getFirstImageFromProduct(detailFilePath, slug);
    
    if (firstImage) {
      updateCardImage(listFilePath, href, firstImage);
    } else {
      console.log(`⚠ Nenhuma imagem encontrada para: ${slug}`);
    }
  }
}

/**
 * Função principal
 */
function main() {
  console.log('🚀 Iniciando atualização automática de imagens nos cards...\n');
  
  try {
    processSecoCards();
    processOleoCards();
    
    console.log('\n✅ Atualização de cards concluída com sucesso!');
    console.log('💡 Execute "npm run dev" para ver as mudanças.');
  } catch (error) {
    console.error('\n❌ Erro durante a atualização:', error);
    process.exit(1);
  }
}

// Executa o script
main();

















