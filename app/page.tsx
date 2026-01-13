import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

// Adicione aqui os projetos realizados
// Coloque as imagens na pasta: public/images/projetos/
const projetos = [
  {
    image: 'projeto-1.jpeg',
    title: 'Projeto Realizado',
    description: 'Transformadores de fabricação ZIlmer em operação contínua há 3 anos na sede da Arcelor Mittal em Santa Catarina'
  },
]

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Zilmer Transformadores</h1>
          <p>Especialistas em transformadores de alta qualidade para diversos segmentos industriais. Soluções confiáveis em transformadores imersos em óleo, transformadores a seco e transformadores para instrumentos.</p>
          <Link href="/produtos" className="btn">
            Conheça Nossos Produtos
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2>Nossos Produtos</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Transformadores Óleo</h3>
              <ul>
                <li>Para Retificadores</li>
                <li>Para Fornos</li>
                <li>De Partida</li>
                <li>De Aterramento</li>
                <li>Autotransformadores</li>
                <li>Reatores</li>
              </ul>
              <Link href="/produtos/transformadores-oleo" className="btn btn-secondary">
                Saiba Mais
              </Link>
            </div>

            <div className={styles.card}>
              <h3>Transformadores a Seco</h3>
              <ul>
                <li>Para Retificadores</li>
                <li>Aterramento</li>
                <li>Baixa Tensão</li>
              </ul>
              <Link href="/produtos/transformadores-seco" className="btn btn-secondary">
                Saiba Mais
              </Link>
            </div>

            <div className={styles.card}>
              <h3>Transformadores para Instrumentos</h3>
              <ul>
                <li>TP (Transformadores de Potencial)</li>
                <li>TC (Transformadores de Corrente)</li>
                <li>Uso Interno e Externo</li>
              </ul>
              <Link href="/produtos/transformadores-instrumentos" className="btn btn-secondary">
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projects}>
        <div className="container">
          <h2>Projetos</h2>
          {projetos.length > 0 ? (
            <div className={styles.projectGrid}>
              {projetos.map((projeto, index) => (
                <div key={index} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <Image
                      src={`/images/projetos/${projeto.image}`}
                      alt={projeto.title}
                      width={800}
                      height={450}
                      className={styles.image}
                    />
                  </div>
                  <h3>{projeto.title}</h3>
                  <p>{projeto.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.projectGrid}>
              <div className={styles.projectCard}>
                <div className={styles.projectPlaceholder}>
                  <span>📁 Adicione imagens em: public/images/projetos/</span>
                </div>
                <h3>Projetos</h3>
                <p>Adicione os projetos no array <code>projetos</code> no arquivo page.tsx</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

