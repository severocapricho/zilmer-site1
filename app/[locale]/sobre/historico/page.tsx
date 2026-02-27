import styles from './page.module.css'
// @ts-ignore
import sobreDataJson from '@/data/sobre.json'

const sobreData = sobreDataJson as {
  historico: {
    title: string
    subtitle: string
    content: string
  }
}

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

export default function HistoricoPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>{sobreData.historico.title}</h1>
        <div className={styles.content}>
          <h2>{sobreData.historico.subtitle}</h2>
          {renderText(sobreData.historico.content)}
        </div>
      </div>
    </section>
  )
}

