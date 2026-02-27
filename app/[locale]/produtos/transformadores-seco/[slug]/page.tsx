import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'
import ContactButton from '@/components/ContactButton'
import styles from './detail.module.css'
import produtosData from '@/data/produtos.json'
import { unstable_noStore as noStore } from 'next/cache'

// Forçar atualização dinâmica para sempre buscar dados atualizados
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function ProductDetail({ params }: { params: { slug: string } }) {
  // Desabilitar cache para garantir dados sempre atualizados
  noStore()
  // Mapear slugs para chaves do JSON
  const slugToKey: { [key: string]: string } = {
    'media-tensao': 'media-tensao',
    'para-retificadores': 'para-retificadores',
    'aterramento': 'aterramento',
    'baixa-tensao': 'baixa-tensao',
    'reatores-de-partida': 'reatores-de-partida',
  }

  const produtoKey = slugToKey[params.slug]
  const produtos = produtosData.seco?.produtos
  const produto = produtoKey && produtos && produtoKey in produtos ? produtos[produtoKey as keyof typeof produtos] : null

  if (!produto) {
    notFound()
  }

  // Usar imagens do JSON ou fallback vazio
  const images = produto.images || []
  // Usar legendas do JSON ou fallback vazio
  const captions = (produto as any).captions || {}
  // Usar índice da primeira imagem do JSON ou padrão 0
  const firstImageIndex = (produto as any).firstImageIndex !== undefined 
    ? (produto as any).firstImageIndex 
    : 0
  const hasPdf = params.slug === 'baixa-tensao'

  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{produto.title}</h1>
        
        <div className={styles.content}>
          {images.length > 0 && (
            <div className={styles.gallerySection}>
              <ImageGallery 
                images={images} 
                alt={produto.title} 
                captions={captions}
                firstImageIndex={firstImageIndex}
              />
            </div>
          )}

          <div className={styles.infoSection}>
            {produto.longDescription && (
              <div className={styles.description}>
                <h2>Descrição</h2>
                <p>{produto.longDescription}</p>
              </div>
            )}

            <div className={styles.contactButton}>
              <ContactButton />
            </div>

            {hasPdf && (
              <div className={styles.pdfDownloadSection}>
                <div className={styles.pdfCard}>
                  <div className={styles.pdfIcon}>📄</div>
                  <div className={styles.pdfInfo}>
                    <h3 className={styles.pdfTitle}>Catálogo TAI e TCI</h3>
                    <p className={styles.pdfDescription}>
                      Especificações técnicas e Desenho Dimensional Orientativo
                    </p>
                  </div>
                  <a
                    href="/catalogos/CATALOGO-TAI-e-TCI.pdf"
                    download
                    className={styles.downloadButton}
                  >
                    Download
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

