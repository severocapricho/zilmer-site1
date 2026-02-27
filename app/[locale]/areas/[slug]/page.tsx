'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import areasDataJson from '../../../data/areas.json'

// Dados completos das áreas de aplicação
const areasData = areasDataJson as {
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

// Helper para renderizar texto com ou sem HTML
function renderText(text: string | undefined | null) {
  if (!text) return <p></p>
  
  // Verifica se o texto contém tags HTML
  const hasHTML = /<[^>]+>/.test(text)
  
  if (hasHTML) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  }
  
  // Se não tem HTML, renderiza como texto simples
  return <p>{text}</p>
}

// Lista ordenada das áreas para navegação
const areasOrder = ['transporte', 'hidreletrica', 'mineracao', 'subestacoes', 'energias-renovaveis', 'controle-medicao']

export default function AreaPage({ params }: { params: { slug: string } }) {
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
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image
            src={(area.aplicacao as any).heroImage || area.aplicacao.image}
            alt={area.title}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        {/* Setas de navegação */}
        <Link href={`/areas/${prevSlug}`} className={styles.heroNavArrow} style={{ left: '20px' }} aria-label={`Ir para ${prevArea.title}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Link>
        <Link href={`/areas/${nextSlug}`} className={styles.heroNavArrow} style={{ right: '20px' }} aria-label={`Ir para ${nextArea.title}`}>
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
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{area.aplicacao.title}</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.aplicacaoGrid}>
            <div className={styles.aplicacaoImage}>
              <div className={styles.imageWrapper}>
                <Image
                  src={images[currentImageIndex]}
                  alt={area.aplicacao.title}
                  fill
                  className={styles.contentImage}
                />
                {hasMultipleImages && (
                  <>
                    <button
                      className={styles.carouselArrowLeft}
                      onClick={prevImage}
                      aria-label="Imagem anterior"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button
                      className={styles.carouselArrowRight}
                      onClick={nextImage}
                      aria-label="Próxima imagem"
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
                          aria-label={`Ir para imagem ${index + 1}`}
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

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              {(area as any).cta?.title || 'Interessado em nossas soluções?'}
            </h2>
            <p className={styles.ctaText}>
              {(area as any).cta?.text || 'Entre em contato e descubra como podemos ajudar seu projeto'}
            </p>
            <Link href="/contato" className={styles.ctaButton}>
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}





