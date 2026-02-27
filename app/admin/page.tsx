'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './page.module.css'

// Importar ReactQuill dinamicamente para evitar problemas de SSR
const ReactQuill = dynamic(
  () => import('react-quill'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ minHeight: '400px', padding: '1rem', border: '2px solid #dee2e6', borderRadius: '4px' }}>
        <p>Carregando editor...</p>
      </div>
    )
  }
)

interface AreaData {
  title: string
  aplicacao: {
    title: string
    description: string
    onde?: string
    como?: string
    image: string
    heroImage: string
    heroDescription: string
  }
  solucao: {
    title: string
    problem: string
    melhora: string
    essencial: string
  }
  projetos: Array<{
    title: string
    description: string
    image: string
  }>
}

interface AreasData {
  [key: string]: AreaData
}

export default function AdminPage() {
  const [areasData, setAreasData] = useState<AreasData>({})
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [selectedField, setSelectedField] = useState<string>('')
  const [editedValue, setEditedValue] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadAreasData()
    
    // Carregar CSS do React Quill apenas no cliente
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'
      document.head.appendChild(link)
      
      return () => {
        // Limpar ao desmontar
        const existingLink = document.querySelector('link[href="https://cdn.quilljs.com/1.3.6/quill.snow.css"]')
        if (existingLink) {
          existingLink.remove()
        }
      }
    }
  }, [])

  const loadAreasData = async () => {
    try {
      const response = await fetch('/api/admin/areas')
      if (response.ok) {
        const data = await response.json()
        setAreasData(data)
        if (Object.keys(data).length > 0 && !selectedArea) {
          setSelectedArea(Object.keys(data)[0])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleSave = async () => {
    if (!selectedArea || !selectedField) return

    setLoading(true)
    setMessage(null)

    try {
      let valueToSave: string | string[] = editedValue
      
      // Se for legendas, remover tags HTML e limpar o texto
      if (selectedField === 'aplicacao.imageCaption' || selectedField === 'aplicacao.imageCaptions') {
        // Remover tags HTML se existirem
        let cleanValue = editedValue.replace(/<[^>]*>/g, '').trim()
        
        // Se for imageCaptions, converter string com quebras de linha para array
        if (selectedField === 'aplicacao.imageCaptions') {
          valueToSave = cleanValue.split('\n').filter((line: string) => line.trim() !== '')
        } else {
          valueToSave = cleanValue
        }
      }

      const response = await fetch('/api/admin/areas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area: selectedArea,
          field: selectedField,
          value: valueToSave,
        }),
      })

      if (response.ok) {
        const updatedData = await response.json()
        setAreasData(updatedData)
        setMessage({ type: 'success', text: 'Texto salvo com sucesso!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || errorData.message || 'Erro ao salvar. Tente novamente.'
        setMessage({ type: 'error', text: errorMessage })
        console.error('Erro ao salvar:', errorData)
      }
    } catch (error: any) {
      console.error('Erro ao salvar:', error)
      setMessage({ type: 'error', text: error?.message || 'Erro ao salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const handleFieldSelect = (field: string) => {
    setSelectedField(field)
    if (selectedArea && areasData[selectedArea]) {
      const area = areasData[selectedArea]
      let value = ''
      
      if (field === 'aplicacao.description') {
        value = area.aplicacao.description
      } else if (field === 'aplicacao.title') {
        value = area.aplicacao.title
      } else if (field === 'aplicacao.heroDescription') {
        value = area.aplicacao.heroDescription
      } else if (field === 'aplicacao.imageCaption') {
        value = (area.aplicacao as any).imageCaption || ''
      } else if (field === 'aplicacao.imageCaptions') {
        // Se for array, converter para string separada por quebras de linha e remover HTML
        const captions = (area.aplicacao as any).imageCaptions || []
        if (Array.isArray(captions)) {
          value = captions.map((cap: string) => 
            typeof cap === 'string' ? cap.replace(/<[^>]*>/g, '').trim() : cap
          ).join('\n')
        } else {
          value = ''
        }
      } else if (field === 'cta.title') {
        value = (area as any).cta?.title || 'Interessado em nossas soluções?'
      } else if (field === 'cta.text') {
        value = (area as any).cta?.text || 'Entre em contato e descubra como podemos ajudar seu projeto'
      } else if (field === 'solucao.problem') {
        value = area.solucao.problem
      } else if (field === 'solucao.melhora') {
        value = area.solucao.melhora
      } else if (field === 'solucao.essencial') {
        value = area.solucao.essencial
      }
      
      setEditedValue(value)
    }
  }

  const areaNames: { [key: string]: string } = {
    transporte: 'Transporte',
    hidreletrica: 'Hidrelétrica',
    mineracao: 'Mineração',
    subestacoes: 'Subestações',
    'energias-renovaveis': 'Energias Renováveis',
    'controle-medicao': 'Controle e Medição',
  }

  const fieldNames: { [key: string]: string } = {
    'aplicacao.description': 'Descrição da Aplicação',
    'aplicacao.title': 'Título da Aplicação',
    'aplicacao.heroDescription': 'Descrição do Hero',
    'aplicacao.imageCaption': 'Legenda da Imagem Principal',
    'aplicacao.imageCaptions': 'Legendas das Imagens (Array)',
    'cta.title': 'CTA - Título',
    'cta.text': 'CTA - Texto',
    'solucao.problem': 'O Problema',
    'solucao.melhora': 'Como Melhora',
    'solucao.essencial': 'Por que é Essencial',
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Editor de Conteúdo - Áreas</h1>
        <p>Edite os textos das páginas de áreas diretamente aqui</p>
        <div style={{ marginTop: '1rem' }}>
          <a href="/admin/sobre" style={{ color: '#6ba3f0', textDecoration: 'none', fontWeight: 600 }}>
            → Editar páginas de Sobre
          </a>
          {' | '}
          <a href="/admin/produtos" style={{ color: '#6ba3f0', textDecoration: 'none', fontWeight: 600 }}>
            → Editar páginas de Produtos
          </a>
        </div>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.adminContent}>
        <div className={styles.sidebar}>
          <h2>Selecione a Área</h2>
          <div className={styles.areaList}>
            {Object.keys(areasData).map((key) => (
              <button
                key={key}
                className={`${styles.areaButton} ${selectedArea === key ? styles.active : ''}`}
                onClick={() => {
                  setSelectedArea(key)
                  setSelectedField('')
                  setEditedValue('')
                }}
              >
                {areaNames[key] || key}
              </button>
            ))}
          </div>

          {selectedArea && (
            <>
              <h2 style={{ marginTop: '2rem' }}>Selecione o Campo</h2>
              <div className={styles.fieldList}>
                {Object.keys(fieldNames).map((field) => (
                  <button
                    key={field}
                    className={`${styles.fieldButton} ${selectedField === field ? styles.active : ''}`}
                    onClick={() => handleFieldSelect(field)}
                  >
                    {fieldNames[field]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.editor}>
          {selectedArea && selectedField ? (
            <>
              <div className={styles.editorHeader}>
                <h2>
                  {areaNames[selectedArea]} - {fieldNames[selectedField]}
                </h2>
              </div>
              <div className={styles.editorWrapper}>
                {selectedField === 'aplicacao.imageCaptions' || selectedField === 'aplicacao.imageCaption' ? (
                  // Editor de texto simples para legendas (sem HTML)
                  <textarea
                    value={editedValue || ''}
                    onChange={(e) => setEditedValue(e.target.value)}
                    placeholder={selectedField === 'aplicacao.imageCaptions' 
                      ? "Digite uma legenda por linha. Cada linha será uma legenda para cada imagem na ordem."
                      : "Digite a legenda da imagem (texto simples, sem formatação)"}
                    style={{
                      width: '100%',
                      minHeight: selectedField === 'aplicacao.imageCaptions' ? '300px' : '100px',
                      padding: '15px',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      resize: 'vertical'
                    }}
                  />
                ) : typeof window !== 'undefined' ? (
                  <ReactQuill
                    theme="snow"
                    value={editedValue || ''}
                    onChange={setEditedValue}
                    placeholder="Digite o texto aqui..."
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['link'],
                        [{ 'color': [] }, { 'background': [] }],
                        ['clean']
                      ],
                    }}
                    formats={[
                      'header',
                      'bold', 'italic', 'underline', 'strike',
                      'list', 'bullet',
                      'align',
                      'link',
                      'color', 'background'
                    ]}
                  />
                ) : null}
              </div>
              <div className={styles.editorActions}>
                <button
                  className={styles.saveButton}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                <a
                  href={`/areas/${selectedArea}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.previewButton}
                >
                  Ver Página
                </a>
              </div>
            </>
          ) : (
            <div className={styles.placeholder}>
              <p>Selecione uma área e um campo para começar a editar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

