import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import styles from './page.module.css'

// Helper para renderizar texto com ou sem HTML
function renderText(text: string | undefined | null) {
  if (!text) return <p></p>
  
  const hasHTML = /<[^>]+>/.test(text)
  
  if (hasHTML) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  }
  
  // Se não tem HTML, dividir por quebras de linha duplas e renderizar como parágrafos
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph.trim()}</p>
      ))}
    </>
  )
}

export default function SobrePage() {
  const t = useTranslations('about')
  
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>{t('title')}</h1>
        <div className={styles.content}>
          <div className={styles.intro}>
            {renderText(t('intro'))}
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src="/images/sobre/transformadores-instalacao.jpg"
                alt="Transformadores Zilmer em instalação industrial"
                className={styles.heroImage}
              />
            </div>
          </div>

          <div className={styles.grid}>
            <Link href="/sobre/historico" className={styles.card}>
              <h3>{t('cards.history.title')}</h3>
              <p>{t('cards.history.description')}</p>
            </Link>

            <Link href="/sobre/clientes" className={styles.card}>
              <h3>{t('cards.clients.title')}</h3>
              <p>{t('cards.clients.description')}</p>
            </Link>

            <Link href="/sobre/certificados" className={styles.card}>
              <h3>{t('cards.certificates.title')}</h3>
              <p>{t('cards.certificates.description')}</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

