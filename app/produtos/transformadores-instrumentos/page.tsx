import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { tpInternosModels } from './tp-internos-data'
import { tpExternosModels } from './tp-externos-data'
import { tcInternosModels } from './tc-internos-data'
import { tcExternosModels } from './tc-externos-data'

export default function TransformadoresInstrumentosPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Transformadores para Instrumentos</h1>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p>
              Transformadores para instrumentos são equipamentos essenciais para medição, 
              proteção e controle de sistemas elétricos. Nossos transformadores de potencial (TP) 
              e transformadores de corrente (TC) são fabricados com alta precisão e confiabilidade, 
              garantindo medições precisas e proteção adequada dos equipamentos.
            </p>
          </div>

          <div className={styles.categories}>
            <div className={styles.category}>
              <h2>TP (Transformadores de Potencial)</h2>
              
              <div className={styles.usageSection}>
                <h3>Uso Interno</h3>
                <p className={styles.usageDescription}>
                  Transformadores de potencial para instalação interna em subestações, painéis 
                  elétricos e quadros de distribuição, projetados para ambientes protegidos, 
                  garantindo alta precisão e confiabilidade nas medições de tensão.
                </p>
                
                <div className={styles.modelsGallery}>
                  {tpInternosModels.map((model) => (
                    <Link
                      key={model.id}
                      href={model.pdf || '#'}
                      className={styles.modelCard}
                      target={model.pdf ? '_blank' : undefined}
                      rel={model.pdf ? 'noopener noreferrer' : undefined}
                    >
                      <div className={styles.modelImageContainer}>
                        <Image
                          src={model.image}
                          alt={`Modelo ${model.name}`}
                          width={200}
                          height={200}
                          className={styles.modelImage}
                        />
                      </div>
                      <div className={styles.modelName}>{model.name}</div>
                      {model.pdf && (
                        <div className={styles.pdfBadge}>PDF</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className={styles.usageSection}>
                <h3>Uso Externo</h3>
                <p className={styles.usageDescription}>
                  Transformadores de potencial para instalação externa, desenvolvidos com 
                  proteção adequada contra intempéries, umidade e variações climáticas, 
                  mantendo alta precisão mesmo em condições ambientais adversas.
                </p>
                
                <div className={styles.modelsGallery}>
                  {tpExternosModels.map((model) => (
                    <Link
                      key={model.id}
                      href={model.pdf || '#'}
                      className={styles.modelCard}
                      target={model.pdf ? '_blank' : undefined}
                      rel={model.pdf ? 'noopener noreferrer' : undefined}
                    >
                      <div className={styles.modelImageContainer}>
                        <Image
                          src={model.image}
                          alt={`Modelo ${model.name}`}
                          width={200}
                          height={200}
                          className={styles.modelImage}
                        />
                      </div>
                      <div className={styles.modelName}>{model.name}</div>
                      {model.pdf && (
                        <div className={styles.pdfBadge}>PDF</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.category}>
              <h2>TC (Transformadores de Corrente)</h2>
              
              <div className={styles.usageSection}>
                <h3>Uso Interno</h3>
                <p className={styles.usageDescription}>
                  Transformadores de corrente para instalação interna em subestações, painéis 
                  elétricos e quadros de distribuição, oferecendo medição precisa de corrente 
                  para sistemas de proteção, controle e medição energética.
                </p>
                
                <div className={styles.modelsGallery}>
                  {tcInternosModels.map((model) => (
                    <Link
                      key={model.id}
                      href={model.pdf || '#'}
                      className={styles.modelCard}
                      target={model.pdf ? '_blank' : undefined}
                      rel={model.pdf ? 'noopener noreferrer' : undefined}
                    >
                      <div className={styles.modelImageContainer}>
                        <Image
                          src={model.image}
                          alt={`Modelo ${model.name}`}
                          width={200}
                          height={200}
                          className={styles.modelImage}
                        />
                      </div>
                      <div className={styles.modelName}>{model.name}</div>
                      {model.pdf && (
                        <div className={styles.pdfBadge}>PDF</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className={styles.usageSection}>
                <h3>Uso Externo</h3>
                <p className={styles.usageDescription}>
                  Transformadores de corrente para instalação externa, projetados com proteção 
                  robusta contra intempéries e condições climáticas adversas, garantindo medições 
                  precisas e confiáveis mesmo em ambientes externos.
                </p>
                
                <div className={styles.modelsGallery}>
                  {tcExternosModels.map((model) => (
                    <Link
                      key={model.id}
                      href={model.pdf || '#'}
                      className={styles.modelCard}
                      target={model.pdf ? '_blank' : undefined}
                      rel={model.pdf ? 'noopener noreferrer' : undefined}
                    >
                      <div className={styles.modelImageContainer}>
                        <Image
                          src={model.image}
                          alt={`Modelo ${model.name}`}
                          width={200}
                          height={200}
                          className={styles.modelImage}
                        />
                      </div>
                      <div className={styles.modelName}>{model.name}</div>
                      {model.pdf && (
                        <div className={styles.pdfBadge}>PDF</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

