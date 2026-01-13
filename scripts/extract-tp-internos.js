const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// URL da página de TP Internos
const wixPageUrl = 'https://zilmertransformado.wixsite.com/zilmer/tp-internos';

const downloadDir = path.join(__dirname, '../public/images/produtos/instrumentos/tp-internos');

// Criar pasta se não existir
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractImageUrls(html) {
  const urls = [];
  
  // Procurar por URLs do Wix Static
  const wixStaticRegex = /https:\/\/static\.wixstatic\.com\/media\/[^"'\s)]+/g;
  const matches = html.match(wixStaticRegex);
  
  if (matches) {
    matches.forEach(url => {
      let cleanUrl = url.split('"')[0].split("'")[0].split(')')[0];
      if (!urls.includes(cleanUrl)) {
        urls.push(cleanUrl);
      }
    });
  }
  
  // Procurar por URLs de imagens Wix MP
  const wixMpRegex = /https:\/\/images-wixmp-[^"'\s)]+/g;
  const mpMatches = html.match(wixMpRegex);
  
  if (mpMatches) {
    mpMatches.forEach(url => {
      let cleanUrl = url.split('"')[0].split("'")[0].split(')')[0];
      if (!urls.includes(cleanUrl)) {
        urls.push(cleanUrl);
      }
    });
  }
  
  return urls;
}

function extractPdfUrls(html) {
  const pdfs = [];
  
  // Procurar por URLs de PDF
  const pdfRegex = /https:\/\/[^"'\s)]+\.pdf/g;
  const matches = html.match(pdfRegex);
  
  if (matches) {
    matches.forEach(url => {
      let cleanUrl = url.split('"')[0].split("'")[0].split(')')[0];
      if (!pdfs.includes(cleanUrl)) {
        pdfs.push(cleanUrl);
      }
    });
  }
  
  return pdfs;
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(downloadDir, filename);
    
    if (fs.existsSync(filePath)) {
      console.log(`⚠️  ${filename} já existe. Pulando...`);
      resolve();
      return;
    }

    console.log(`📥 Baixando: ${filename}...`);

    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ ${filename} baixado!`);
          resolve();
        });
      } else if (response.statusCode >= 300 && response.statusCode < 400) {
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Erro ${response.statusCode}`));
      }
    });

    request.on('error', reject);
    request.setTimeout(15000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function main() {
  console.log('🔍 Extraindo imagens de TP Internos do Wix...\n');
  console.log(`📄 Acessando: ${wixPageUrl}\n`);

  try {
    const html = await fetchPage(wixPageUrl);
    console.log('✅ Página carregada!\n');
    
    const imageUrls = extractImageUrls(html);
    const pdfUrls = extractPdfUrls(html);
    
    console.log(`📸 Encontradas ${imageUrls.length} URLs de imagens`);
    console.log(`📄 Encontrados ${pdfUrls.length} URLs de PDFs\n`);
    
    if (imageUrls.length === 0) {
      console.log('❌ Nenhuma URL encontrada.');
      return;
    }

    // Filtrar apenas imagens relevantes (não logos, não ícones)
    const relevantImages = imageUrls.filter(url => {
      const urlLower = url.toLowerCase();
      // Excluir logos, ícones pequenos
      return !urlLower.includes('logo') && 
             !urlLower.includes('icon') &&
             url.match(/\.(jpg|jpeg|png|webp)/i);
    });

    console.log(`📦 ${relevantImages.length} imagens relevantes encontradas\n`);

    // Baixar imagens
    const downloadedImages = [];
    for (let i = 0; i < relevantImages.length; i++) {
      const url = relevantImages[i];
      const ext = url.match(/\.(jpg|jpeg|png|webp)/i)?.[0] || '.jpg';
      const filename = `tp-interno-${i + 1}${ext}`;
      
      try {
        await downloadImage(url, filename);
        downloadedImages.push({
          image: filename,
          url: url,
          pdf: pdfUrls[i] || null // Tentar associar PDF por índice
        });
      } catch (error) {
        console.error(`❌ Erro ao baixar ${filename}:`, error.message);
      }
    }

    // Salvar informações em JSON para referência
    const infoFile = path.join(downloadDir, 'images-info.json');
    fs.writeFileSync(infoFile, JSON.stringify(downloadedImages, null, 2));
    console.log(`\n💾 Informações salvas em: ${infoFile}`);

    console.log('\n✅ Processo concluído!');
    console.log(`📁 Imagens em: ${downloadDir}\n`);
    console.log('📋 Próximos passos:');
    console.log('   1. Verifique as imagens baixadas');
    console.log('   2. Associe os PDFs corretos a cada imagem');
    console.log('   3. As imagens serão adicionadas à página automaticamente\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

main();


