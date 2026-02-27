'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

interface Noticia {
  id: string
  title: string
  description: string
  image: string
  slug: string
  content: string
  date: string
}

const noticias: Noticia[] = [
  {
    id: '1',
    title: 'Projeto em Operação - Hidrelétrica',
    description: 'Transformadores de força para sistema de geração de energia hidrelétrica continuam operando com máxima eficiência e confiabilidade.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-hidreletrica',
    content: `
      <p>Nossos transformadores de força instalados na usina hidrelétrica continuam operando com excelência, garantindo o fornecimento estável de energia elétrica para a região.</p>
      
      <p>O projeto, que foi implementado há dois anos, demonstra a robustez e confiabilidade dos nossos equipamentos em condições de operação contínua. Os transformadores foram projetados especificamente para atender às demandas de alta potência do sistema de geração.</p>
      
      <p>Com monitoramento constante e manutenção preventiva, os equipamentos mantêm seus parâmetros de desempenho dentro das especificações técnicas, garantindo eficiência energética e segurança operacional.</p>
    `,
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Novo Projeto Aplicado - Subestação Industrial',
    description: 'Solução completa em transformadores para subestação de grande porte recém-instalada e em fase de testes.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-subestacao',
    content: `
      <p>Acabamos de concluir a instalação de uma solução completa em transformadores para uma subestação industrial de grande porte. O projeto representa um marco importante na expansão da infraestrutura elétrica da região.</p>
      
      <p>Os transformadores foram customizados para atender às necessidades específicas do cliente, incluindo requisitos de alta tensão e capacidade de carga. A instalação foi realizada por nossa equipe técnica especializada, seguindo rigorosos protocolos de segurança.</p>
      
      <p>Atualmente, os equipamentos estão em fase de testes e comissionamento, com previsão de entrada em operação comercial nas próximas semanas.</p>
    `,
    date: '2024-02-20',
  },
  {
    id: '3',
    title: 'Projeto em Operação - Mineração',
    description: 'Transformadores robustos para operação em ambiente de mineração mantendo alta performance e durabilidade.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-mineracao',
    content: `
      <p>Nossos transformadores instalados em operações de mineração continuam demonstrando sua capacidade de resistir a condições extremas de operação. Projetados especificamente para ambientes industriais desafiadores, os equipamentos mantêm alta performance mesmo sob condições severas.</p>
      
      <p>A robustez dos transformadores é essencial neste tipo de aplicação, onde a confiabilidade é crítica para manter a produção. Nossos equipamentos foram testados e aprovados para operação em ambientes com alta umidade, variações de temperatura e exposição a partículas.</p>
      
      <p>O projeto tem sido um sucesso, com os transformadores operando sem interrupções e mantendo todos os parâmetros dentro das especificações técnicas.</p>
    `,
    date: '2024-01-10',
  },
]

export default function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const noticia = noticias.find((n) => n.slug === slug)

  if (!noticia) {
    return (
      <section className={styles.page}>
        <div className="container">
          <Link href="/" className={styles.backLink}>
            ← Voltar para Home
          </Link>
          <div className={styles.article}>
            <h1 className={styles.title}>Notícia não encontrada</h1>
            <p>A notícia que você está procurando não existe.</p>
          </div>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <Link href="/" className={styles.backLink}>
          ← Voltar para Home
        </Link>

        <article className={styles.article}>
          <div className={styles.header}>
            <h1 className={styles.title}>{noticia.title}</h1>
            <time className={styles.date}>{formatDate(noticia.date)}</time>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src={noticia.image}
              alt={noticia.title}
              fill
              className={styles.image}
              sizes="100vw"
              priority
            />
          </div>

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: noticia.content }}
          />
        </article>
      </div>
    </section>
  )
}

