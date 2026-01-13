import styles from './page.module.css'

export default function TransformadoresOleoPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Transformadores Imersos em Óleo</h1>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p>
              Transformadores imersos em óleo são equipamentos essenciais para sistemas 
              elétricos de média e alta potência. O óleo mineral utilizado proporciona 
              excelente isolação elétrica e dissipação de calor, garantindo maior 
              eficiência energética e vida útil prolongada do equipamento.
            </p>
            <p>
              Nossos transformadores imersos em óleo são projetados e fabricados 
              seguindo rigorosos padrões de qualidade, adequados para diversas aplicações 
              industriais e comerciais.
            </p>
          </div>

          <div className={styles.products}>
            <div className={styles.productCard}>
              <h3>Para Retificadores</h3>
              <p>Transformadores especialmente projetados para alimentar sistemas retificadores, 
              garantindo características elétricas adequadas para conversão de corrente alternada 
              em corrente contínua, com excelente desempenho e confiabilidade.</p>
            </div>

            <div className={styles.productCard}>
              <h3>Para Fornos</h3>
              <p>Transformadores robustos desenvolvidos para atender às demandas específicas de 
              fornos elétricos industriais, suportando condições severas de operação e garantindo 
              estabilidade e eficiência energética.</p>
            </div>

            <div className={styles.productCard}>
              <h3>De Partida</h3>
              <p>Transformadores projetados para sistemas de partida suave de motores elétricos, 
              reduzindo a corrente de partida e minimizando os impactos na rede elétrica, 
              protegendo os equipamentos e otimizando o consumo de energia.</p>
            </div>

            <div className={styles.productCard}>
              <h3>De Aterramento</h3>
              <p>Transformadores de aterramento (zig-zag) essenciais para sistemas de proteção 
              elétrica, fornecendo caminho seguro para correntes de falta à terra e garantindo 
              a segurança de pessoas e equipamentos.</p>
            </div>

            <div className={styles.productCard}>
              <h3>Autotransformadores</h3>
              <p>Autotransformadores que oferecem soluções eficientes e econômicas para ajuste 
              de tensão, regulagem de tensão em sistemas elétricos e aplicações específicas 
              que requerem variação controlada de tensão.</p>
            </div>

            <div className={styles.productCard}>
              <h3>Reatores</h3>
              <p>Reatores de alta qualidade para compensação reativa, filtragem harmônica, 
              limitação de corrente e diversas outras aplicações industriais, projetados 
              para máxima eficiência e durabilidade.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

