'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import NextLink from 'next/link'
import styles from './ProjetosRecentes.module.css'

export default function ProjetosRecentes() {
  const t = useTranslations('news')
  const currentNoticia = {
    id: '1',
    title: t('items.1.title'),
    description: t('items.1.description'),
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-hidreletrica',
  }

  return (
    <section className={styles.projetosSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            <div className={styles.imageContainer}>
              <NextLink href={`/projetos/${currentNoticia.slug}` as any}>
                <Image
                  src={currentNoticia.image}
                  alt={currentNoticia.title}
                  fill
                  className={styles.carouselImage}
                  sizes="100vw"
                  priority={true}
                />
              </NextLink>
            </div>

            <div className={styles.carouselContent}>
              <NextLink href={`/projetos/${currentNoticia.slug}` as any} className={styles.contentLink}>
                <h3 className={styles.carouselTitle}>{currentNoticia.title}</h3>
                <p className={styles.carouselDescription}>{currentNoticia.description}</p>
              </NextLink>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}


