'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ImageGallery from '@/components/ImageGallery'
import ContactButton from '@/components/ContactButton'
import styles from './page.module.css'

export default function TransformadoresDeForcaPage() {
  const [forceTransformerCategories, setForceTransformerCategories] = useState<Array<{
    id: string
    title: string
    description: string
    specifications: string[]
    images: string[]
    captions: { [key: string]: string }
  }>>([])
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string
    title: string
    description: string
    specifications: string[]
    images: string[]
    captions: { [key: string]: string }
    firstImageIndex?: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar dados do JSON dinamicamente apenas no cliente
    if (typeof window === 'undefined') return
    
    const loadData = async () => {
      try {
        const response = await fetch('/api/admin/produtos', { cache: 'no-store' })
        if (response.ok) {
          const produtosData = await response.json()
          const categoriasData = produtosData.oleo?.['transformadores-de-forca']?.categorias || {}
          
          // Converter para formato compatível com o componente
          const categories = Object.keys(categoriasData).map((key) => {
            const categoria = categoriasData[key as keyof typeof categoriasData]
            return {
              id: key,
              title: categoria.title,
              description: categoria.description,
              specifications: categoria.specifications || [],
              images: categoria.images || [],
              captions: categoria.captions || {},
              firstImageIndex: (categoria as any).firstImageIndex !== undefined 
                ? (categoria as any).firstImageIndex 
                : 0,
            }
          })
          
          setForceTransformerCategories(categories)
          if (categories.length > 0) {
            setSelectedCategory(categories[0])
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        // Fallback para dados estáticos se a API falhar
        import('@/data/produtos.json').then((module) => {
          const produtosData = module.default
          const categoriasData = produtosData.oleo?.['transformadores-de-forca']?.categorias || {}
          const categories = Object.keys(categoriasData).map((key) => {
            const categoria = categoriasData[key as keyof typeof categoriasData]
            return {
              id: key,
              title: categoria.title,
              description: categoria.description,
              specifications: categoria.specifications || [],
              images: categoria.images || [],
              captions: (categoria as any).captions || {},
              firstImageIndex: (categoria as any).firstImageIndex !== undefined 
                ? (categoria as any).firstImageIndex 
                : 0,
            }
          })
          setForceTransformerCategories(categories)
          if (categories.length > 0) {
            setSelectedCategory(categories[0])
          }
        })
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (loading) {
    return (
      <section className={styles.page}>
        <div className="container">
          <h1>Transformadores de Força</h1>
          <p>Carregando...</p>
        </div>
      </section>
    )
  }

  if (forceTransformerCategories.length === 0) {
    return (
      <section className={styles.page}>
        <div className="container">
          <h1>Transformadores de Força</h1>
          <p>Nenhuma categoria disponível.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <h1>Transformadores de Força</h1>
        
        <div className={styles.forcePageContent}>
          {/* Sidebar de categorias */}
          <div className={styles.categorySidebar}>
            <h2>Categories</h2>
            <nav className={styles.categoryNav}>
              {forceTransformerCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryItem} ${
                    selectedCategory && selectedCategory.id === category.id ? styles.activeCategory : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Conteúdo principal */}
          {selectedCategory ? (
            <div className={styles.categoryDetail}>
              <h2 className={styles.categoryTitle}>{selectedCategory.title}</h2>
              
              {selectedCategory.images.length > 0 && (
                <div className={styles.galleryWrapper}>
                  <ImageGallery 
                    images={selectedCategory.images} 
                    alt={selectedCategory.title}
                    captions={selectedCategory.captions}
                    firstImageIndex={selectedCategory.firstImageIndex}
                  />
                </div>
              )}

              <div className={styles.categoryDescription}>
                <p>{selectedCategory.description}</p>
              </div>

              <div className={styles.specifications}>
                <h3>Especificações Técnicas</h3>
                <ul className={styles.specificationsList}>
                  {selectedCategory.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.contactButton}>
                <ContactButton />
              </div>
            </div>
          ) : (
            <div className={styles.categoryDetail}>
              <p>Selecione uma categoria</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}







