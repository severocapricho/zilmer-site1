import Image from 'next/image'
import styles from './page.module.css'
// @ts-ignore
import sobreDataJson from '../../../data/sobre.json'

const sobreData = sobreDataJson as {
  clientes: {
    title: string
    description: string
  }
}

// Adicione aqui os nomes dos arquivos de imagens dos clientes
// Coloque as imagens na pasta: public/images/clientes/
const clientes = [
  'logo-clientes-1.png',
]

// Helper para renderizar texto com ou sem HTML
function renderText(text: string | undefined | null) {
  if (!text) return <p></p>
  
  const hasHTML = /<[^>]+>/.test(text)
  
  if (hasHTML) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  }
  
  return <p>{text}</p>
}

export default function ClientesPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>{sobreData.clientes.title}</h1>
        <div className={styles.content}>
          {renderText(sobreData.clientes.description)}
          
          {clientes.length > 0 ? (
            <div className={styles.imageContainer}>
              <Image
                src={`/images/clientes/${clientes[0]}`}
                alt="Nossos Clientes"
                width={1200}
                height={800}
                className={styles.clientImage}
                priority
              />
            </div>
          ) : (
            <div className={styles.placeholder}>
              <p>📁 Adicione as imagens dos logos dos clientes na pasta:</p>
              <p className={styles.path}><code>public/images/clientes/</code></p>
              <p>E depois adicione os nomes dos arquivos no array <code>clientes</code> neste arquivo.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}



