'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './AreasAtuacao.module.css'
import areasDataJson from '@/data/areas.json'

type AreasData = {
  [key: string]: {
    title: string
    aplicacao: {
      title: string
      description: string
      image: string
      heroImage?: string
      heroDescription?: string
    }
    solucao: {
      title: string
      problem: string
      melhora: string
      essencial: string
    }
  }
}

const areasData = areasDataJson as AreasData

const orderedSlugs = [
  'transporte',
  'hidreletrica',
  'mineracao',
  'subestacoes',
  'energias-renovaveis',
  'controle-medicao',
]

function stripHtml(text: string | undefined): string {
  if (!text) return ''
  return text.replace(/<[^>]+>/g, '').trim()
}

export default function AreasAtuacao() {
  const availableAreas = orderedSlugs
    .map((slug) => ({ slug, data: areasData[slug] }))
    .filter((item) => !!item.data)

  if (availableAreas.length === 0) {
    return null
  }

  const [activeSlug, setActiveSlug] = useState<string>(availableAreas[0].slug)

  const activeArea =
    availableAreas.find((item) => item.slug === activeSlug)?.data ??
    availableAreas[0].data

  const heroImage =
    (activeArea.aplicacao as any).heroImage || activeArea.aplicacao.image
  const heroDescription =
    stripHtml((activeArea.aplicacao as any).heroDescription) ||
    stripHtml(activeArea.aplicacao.description)

  return (
    <section className={styles.areasSection}>
      <div className={styles.areasContainer}>
        <div className={styles.backgroundImageWrapper}>
          <Image
            src={heroImage}
            alt={activeArea.title}
            fill
            className={styles.backgroundImage}
            priority
          />
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.contentWrapper}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{activeArea.title}</h1>
              <p className={styles.heroDescription}>{heroDescription}</p>
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.projectsContent}>
                <h2 className={styles.sectionTitle}>Áreas de atuação</h2>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>
                    {activeArea.solucao.title}
                  </h3>
                  <p className={styles.projectDescription}>
                    {activeArea.solucao.problem}
                  </p>
                  <p className={styles.projectDescription}>
                    {activeArea.solucao.melhora}
                  </p>
                  <p className={styles.projectDescription}>
                    {activeArea.solucao.essencial}
                  </p>
                  <div style={{ marginTop: '24px' }}>
                    <Link
                      href={`/areas/${activeSlug}`}
                      className={styles.primaryButton}
                    >
                      Ver detalhes da área
                    </Link>
                  </div>
                </div>
              </div>

              <aside className={styles.categoriesMenu}>
                <nav className={styles.categoriesNav}>
                  {availableAreas.map(({ slug, data }) => (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => setActiveSlug(slug)}
                      className={`${styles.categoryItem} ${
                        slug === activeSlug ? styles.active : ''
                      }`}
                    >
                      <span className={styles.categoryText}>{data.title}</span>
                    </button>
                  ))}
                </nav>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

