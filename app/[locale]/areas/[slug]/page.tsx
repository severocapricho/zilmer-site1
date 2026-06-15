'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import styles from './page.module.css'
import areasDataPtJson from '@/data/areas.json'
import areasDataEnJson from '@/data/areas.en.json'
// @ts-ignore
import areasDataEsJson from '@/data/areas.es.json'
import { useLocale } from 'next-intl'
import { cdnUrl } from '@/lib/assets'

type AreasDataType = {
  [key: string]: {
    title: string
    aplicacao: {
      title: string
      description: string
      onde?: string
      como?: string
      image: string
      heroImage: string
      heroDescription: string
    }
    solucao: {
      title: string
      problem: string
      melhora: string
      essencial: string
    }
    projetos: Array<{
      title: string
      description: string
      image: string
    }>
  }
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim()
}

function renderText(text: string | undefined | null) {
  if (!text) return null
  const plain = stripHtml(text)
  if (!plain) return null
  return (
    <>
      {plain.split('\n\n').filter(p => p.trim()).map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}
    </>
  )
}

// Lista ordenada das áreas para navegação
const areasOrder = ['transporte', 'hidreletrica', 'mineracao', 'subestacoes', 'energias-renovaveis', 'controle-medicao']

export default function AreaPage({ params }: { params: { slug: string } }) {
  console.log('[AreaPage] NEXT_PUBLIC_CDN_URL =', process.env.NEXT_PUBLIC_CDN_URL)
  const locale = useLocale()
  const isEn = locale === 'en'
  const areasData = (locale === 'en' ? areasDataEnJson : locale === 'es' ? areasDataEsJson : areasDataPtJson) as AreasDataType
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!params?.slug) {
    notFound()
  }

  const area = areasData[params.slug as keyof typeof areasData]

  if (!area) {
    notFound()
  }

  // Encontrar índice da área atual
  const currentIndex = areasOrder.indexOf(params.slug)
  const prevSlug = currentIndex > 0 ? areasOrder[currentIndex - 1] : areasOrder[areasOrder.length - 1]
  const nextSlug = currentIndex < areasOrder.length - 1 ? areasOrder[currentIndex + 1] : areasOrder[0]
  const prevArea = areasData[prevSlug as keyof typeof areasData]
  const nextArea = areasData[nextSlug as keyof typeof areasData]

  // Background image mapeado por slug
  const bgExtensions: Record<string, string> = {
    transporte: 'webp',
    hidreletrica: 'webp',
    mineracao: 'jpg',
    subestacoes: 'webp',
    'energias-renovaveis': 'jpg',
    'controle-medicao': 'webp',
  }
  const bgExt = bgExtensions[params.slug]
  const bgImagePath = bgExt ? `/images/areas/backgrounds/${params.slug}.${bgExt}` : null

  // Verificar se há múltiplas imagens (carrossel)
  const images = (area.aplicacao as any).images || [area.aplicacao.image]
  const imageCaptions = (area.aplicacao as any).imageCaptions || []
  const imageCaption = (area.aplicacao as any).imageCaption || ''
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={styles.page}>
      {/* DEBUG - remove after confirming locale */}
      <div style={{ position: 'fixed', bottom: 16, right: 16, background: '#000', color: '#0f0', fontFamily: 'monospace', fontSize: 13, padding: '6px 12px', zIndex: 9999, borderRadius: 4 }}>
        locale: {locale} | isEn: {String(isEn)}
      </div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={(area.aplicacao as any).heroImage || area.aplicacao.image}
            alt={area.title}
            className={styles.heroImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            onError={e => {
              const el = e.currentTarget
              const path = (area.aplicacao as any).heroImage || area.aplicacao.image
              const cdn = cdnUrl(path)
              if (el.src !== cdn) el.src = cdn
            }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        {/* Setas de navegação */}
        <Link href={`/areas/${prevSlug}`} className={styles.heroNavArrow} style={{ left: '20px' }} aria-label={locale === 'en' ? `Go to ${prevArea.title}` : locale === 'es' ? `Ir a ${prevArea.title}` : `Ir para ${prevArea.title}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Link>
        <Link href={`/areas/${nextSlug}`} className={styles.heroNavArrow} style={{ right: '20px' }} aria-label={locale === 'en' ? `Go to ${nextArea.title}` : locale === 'es' ? `Ir a ${nextArea.title}` : `Ir para ${nextArea.title}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>
        
        <div className={styles.heroContent}>
          <div className="container">
            <h1 className={styles.heroTitle}>{area.title}</h1>
            <div className={styles.heroSubtitle}>
              {renderText((area.aplicacao as any).heroDescription || area.aplicacao.description)}
            </div>
          </div>
        </div>
      </section>

      {/* Aplicação Section */}
      <section className={styles.aplicacaoSection}>
        {bgImagePath && (
          <div className={styles.aplicacaoBg} aria-hidden>
            <Image
              src={bgImagePath}
              alt=""
              fill
              className={styles.aplicacaoBgImg}
              priority={false}
            />
            <div className={styles.aplicacaoBgOverlay} />
          </div>
        )}
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{area.aplicacao.title}</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.aplicacaoGrid}>
            <div className={styles.aplicacaoImage}>
              <div className={styles.imageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[currentImageIndex]}
                  alt={area.aplicacao.title}
                  className={styles.contentImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                  onError={e => {
                    const el = e.currentTarget
                    const cdn = cdnUrl(images[currentImageIndex])
                    if (el.src !== cdn) el.src = cdn
                  }}
                />
                {hasMultipleImages && (
                  <>
                    <button
                      className={styles.carouselArrowLeft}
                      onClick={prevImage}
                      aria-label={locale === 'en' ? 'Previous image' : locale === 'es' ? 'Imagen anterior' : 'Imagem anterior'}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button
                      className={styles.carouselArrowRight}
                      onClick={nextImage}
                      aria-label={locale === 'en' ? 'Next image' : locale === 'es' ? 'Imagen siguiente' : 'Próxima imagem'}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                    <div className={styles.carouselIndicators}>
                      {images.map((_: string, index: number) => (
                        <button
                          key={index}
                          className={`${styles.carouselDot} ${currentImageIndex === index ? styles.active : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={locale === 'en' ? `Go to image ${index + 1}` : locale === 'es' ? `Ir a imagen ${index + 1}` : `Ir para imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Legenda da imagem */}
              {(hasMultipleImages && imageCaptions[currentImageIndex]) || (!hasMultipleImages && imageCaption) ? (
                <p className={styles.imageCaption}>
                  {(() => {
                    const captionText = hasMultipleImages ? imageCaptions[currentImageIndex] : imageCaption
                    // Remover tags HTML se existirem
                    if (typeof captionText === 'string') {
                      return captionText.replace(/<[^>]*>/g, '').trim()
                    }
                    return captionText
                  })()}
                </p>
              ) : null}
            </div>
            
            <div className={styles.aplicacaoTextQuadrants}>
              <div className={styles.aplicacaoDescription}>
                {renderText(area.aplicacao.description)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seções removidas e arquivadas:
          - Solução Section (Como Soluciona)
          - Projetos Específicos Section
          Código arquivado em: app/areas/[slug]/page.archived.tsx
      */}

    </div>
  )
}





