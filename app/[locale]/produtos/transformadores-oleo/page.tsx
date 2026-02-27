import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import produtosData from '@/data/produtos.json'
import { unstable_noStore as noStore } from 'next/cache'

// Forçar atualização dinâmica para sempre buscar dados atualizados
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function TransformadoresOleoPage() {
  // Desabilitar cache para garantir dados sempre atualizados
  noStore()
  const produtos = produtosData.oleo?.produtos || {}
  
  // Mapear produtos para seus slugs e imagens padrão
  const produtosMap: { [key: string]: { slug: string; defaultImage: string } } = {
    'para-retificadores': {
      slug: 'para-retificadores',
      defaultImage: '/images/produtos/oleo/para-retificadores/TCO - GE POWER - 12500 kVA.png'
    },
    'para-fornos': {
      slug: 'para-fornos',
      defaultImage: '/images/produtos/oleo/para-fornos/TCO - 3300 kVA.png'
    },
    'de-partida': {
      slug: 'de-partida',
      defaultImage: '/images/produtos/oleo/de-partida/APO - SISNERGY - 1350 CV SEM TAMPA.png'
    },
    'de-aterramento': {
      slug: 'de-aterramento',
      defaultImage: '/images/produtos/oleo/de-aterramento/RAO - HITACHI - 2572 kVA.png'
    },
    'reatores': {
      slug: 'reatores',
      defaultImage: '/images/produtos/oleo/reatores/RAO - VILLARES METALS - 1350 kVA.png'
    }
  }

  const getProductImage = (key: string): string => {
    const produto = produtos && key in produtos ? produtos[key as keyof typeof produtos] : null
    if (produto && (produto as any).image) {
      return (produto as any).image
    }
    return produtosMap[key]?.defaultImage || '/images/produtos/oleo/default.png'
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Transformadores Imersos em Óleo</h1>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p>
              {produtosData.oleo?.intro?.description || 
                'Transformadores imersos em óleo são equipamentos essenciais para sistemas elétricos de alta potência, oferecendo excelente dissipação térmica e rigidez dielétrica. Nossos transformadores são projetados para atender as mais diversas aplicações industriais com máxima confiabilidade e eficiência.'}
            </p>
          </div>

          <div className={styles.featuredProducts}>
            <Link href="/produtos/transformadores-oleo/transformadores-de-forca" className={styles.featuredCard}>
              {(() => {
                // Buscar imagem do card de força - primeiro cardImage, depois primeira imagem da primeira categoria
                const forcaData = produtosData.oleo?.['transformadores-de-forca'] as any
                const forcaImage = forcaData?.cardImage || 
                                  forcaData?.categorias?.['30-500']?.images?.[0] || null
                return forcaImage ? (
                  <div className={styles.featuredImage}>
                    <Image
                      src={forcaImage}
                      alt="Transformadores de Força"
                      fill
                      className={styles.featuredImageContent}
                    />
                  </div>
                ) : null
              })()}
              <h3>Transformadores de Força</h3>
              <p>15 a 72 kV até 20 MVA</p>
            </Link>
            <Link href="/produtos/transformadores-oleo/transformadores-auxiliares" className={styles.featuredCard}>
              {(() => {
                // Buscar imagem dos auxiliares
                const auxiliares = produtos && 'transformadores-auxiliares' in produtos ? produtos['transformadores-auxiliares' as keyof typeof produtos] : null
                const auxiliaresImage = auxiliares && (auxiliares as any).image ? (auxiliares as any).image : 
                                       auxiliares && (auxiliares as any).images && (auxiliares as any).images[0] ? (auxiliares as any).images[0] : null
                return auxiliaresImage ? (
                  <div className={styles.featuredImage}>
                    <Image
                      src={auxiliaresImage}
                      alt="Transformadores Auxiliares"
                      fill
                      className={styles.featuredImageContent}
                    />
                  </div>
                ) : null
              })()}
              <h3>Transformadores Auxiliares</h3>
              <p>5 kVA até 500 kVA</p>
            </Link>
          </div>

          <div className={styles.productsGrid}>
            {Object.keys(produtosMap).map((key) => {
              const produto = produtos && key in produtos ? produtos[key as keyof typeof produtos] : null
              const produtoMap = produtosMap[key]
              if (!produto) return null
              
              return (
                <Link key={key} href={`/produtos/transformadores-oleo/${produtoMap.slug}`} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <Image
                      src={getProductImage(key)}
                      alt={produto.title || produtoMap.slug}
                      fill
                      className={styles.productImageContent}
                    />
                  </div>
                  <h3>{produto.title || produtoMap.slug}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
