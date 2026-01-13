import Link from 'next/link'
import styles from './page.module.css'

export default function SobrePage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Sobre nós</h1>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p>
              Somos uma empresa nacional que oferece a gama mais completa de transformadores. Nossa história é marcada pela inovação e compromisso em fornecer soluções de energia eficientes e confiáveis para nossos clientes. Nossa equipe especializada trabalha incansavelmente para desenvolver e entregar produtos e serviços de alta qualidade que atendam às necessidades únicas de cada projeto. Estamos empenhados em ser líderes no setor de tecnologia de transformadores, oferecendo soluções personalizadas e suporte excepcional. Queremos transformar a maneira como a energia é utilizada e impulsionar o progresso em diversas indústrias.
            </p>
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src="/images/sobre/fabrica-sobre.jpg"
                alt="Área fabril da Zilmer Transformadores - Produção de transformadores"
                className={styles.heroImage}
              />
            </div>
          </div>

          <div className={styles.grid}>
            <Link href="/sobre/historico" className={styles.card}>
              <h3>Histórico</h3>
              <p>Conheça nossa trajetória e evolução no mercado</p>
            </Link>

            <Link href="/sobre/clientes" className={styles.card}>
              <h3>Clientes</h3>
              <p>Empresas que confiam em nossos produtos e serviços</p>
            </Link>

            <Link href="/sobre/certificados" className={styles.card}>
              <h3>Certificados</h3>
              <p>Qualidade e conformidade certificadas</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

