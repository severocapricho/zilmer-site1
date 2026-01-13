import Link from 'next/link'
import styles from './page.module.css'

export default function ProdutosPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Nossos Produtos</h1>
        <p className={styles.subtitle}>
          Oferecemos uma ampla gama de transformadores para atender diversas necessidades industriais
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Transformadores Imersos em Óleo</h2>
            <ul>
              <li>Para Retificadores</li>
              <li>Para Fornos</li>
              <li>De Partida</li>
              <li>De Aterramento</li>
              <li>Autotransformadores</li>
              <li>Reatores</li>
            </ul>
            <Link href="/produtos/transformadores-oleo" className="btn">
              Ver Detalhes
            </Link>
          </div>

          <div className={styles.card}>
            <h2>Transformadores a Seco</h2>
            <ul>
              <li>Para Retificadores</li>
              <li>Aterramento</li>
              <li>Baixa Tensão</li>
            </ul>
            <Link href="/produtos/transformadores-seco" className="btn">
              Ver Detalhes
            </Link>
          </div>

          <div className={styles.card}>
            <h2>Transformadores para Instrumentos</h2>
            <div className={styles.instrumentos}>
              <div>
                <h3>TP (Transformadores de Potencial)</h3>
                <ul>
                  <li>Uso Interno</li>
                  <li>Uso Externo</li>
                </ul>
              </div>
              <div>
                <h3>TC (Transformadores de Corrente)</h3>
                <ul>
                  <li>Uso Interno</li>
                  <li>Uso Externo</li>
                </ul>
              </div>
            </div>
            <Link href="/produtos/transformadores-instrumentos" className="btn">
              Ver Detalhes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}





