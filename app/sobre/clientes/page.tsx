import Image from 'next/image'
import styles from './page.module.css'

// Adicione aqui os nomes dos arquivos de imagens dos clientes
// Coloque as imagens na pasta: public/images/clientes/
const clientes = [
  'logo-clientes-1.png',
]

export default function ClientesPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Clientes</h1>
        <div className={styles.content}>
          <p>
            Temos o orgulho de trabalhar com empresas líderes em seus segmentos, 
            fornecendo transformadores de alta qualidade e soluções personalizadas 
            para suas necessidades específicas.
          </p>
          
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



