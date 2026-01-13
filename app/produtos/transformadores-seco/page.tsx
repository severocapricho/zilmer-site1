import styles from './page.module.css'

export default function TransformadoresSecoPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Transformadores a Seco</h1>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p>
              Transformadores a seco oferecem vantagens significativas em termos de segurança 
              e facilidade de manutenção, sendo ideais para instalações em ambientes internos, 
              áreas de alta densidade populacional ou locais com restrições ambientais.
            </p>
            <p>
              Utilizamos materiais isolantes de última geração e tecnologia avançada para 
              garantir máxima eficiência, confiabilidade e segurança operacional, sem a 
              necessidade de óleo isolante.
            </p>
          </div>

          <div className={styles.products}>
            <div className={styles.productCard}>
              <h3>Para Retificadores</h3>
              <p>Transformadores a seco especialmente desenvolvidos para alimentar sistemas 
              retificadores, oferecendo características elétricas adequadas com total segurança 
              e sem riscos de vazamento de óleo, ideal para instalações internas.</p>
            </div>

            <div className={styles.productCard}>
              <h3>Aterramento</h3>
              <p>Transformadores de aterramento a seco que proporcionam sistemas de proteção 
              elétrica seguros e eficientes, sem necessidade de óleo, garantindo segurança 
              de pessoas e equipamentos em ambientes internos e externos.</p>
            </div>

            <div className={styles.productCard}>
              <h3>Baixa Tensão</h3>
              <p>Transformadores a seco para aplicações de baixa tensão em diversos segmentos, 
              incluindo distribuição elétrica, automação industrial, sistemas de iluminação e 
              outras aplicações que exigem segurança, confiabilidade e fácil manutenção.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

