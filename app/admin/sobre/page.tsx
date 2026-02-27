'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from '../page.module.css'

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

interface SobreData {
  principal: {
    title: string
    intro: string
    cards: {
      historico: { title: string; description: string }
      clientes: { title: string; description: string }
      certificados: { title: string; description: string }
    }
  }
  historico: {
    title: string
    subtitle: string
    content: string
  }
  clientes: {
    title: string
    description: string
  }
  certificados: {
    title: string
    description: string
  }
}

export default function AdminSobrePage() {
  const [sobreData, setSobreData] = useState<SobreData | null>(null)
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [selectedField, setSelectedField] = useState<string>('')
  const [editedValue, setEditedValue] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadSobreData()
    
    // Carregar CSS do React Quill apenas no cliente
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'
      document.head.appendChild(link)
      
      return () => {
        const existingLink = document.querySelector('link[href="https://cdn.quilljs.com/1.3.6/quill.snow.css"]')
        if (existingLink) {
          existingLink.remove()
        }
      }
    }
  }, [])

  const loadSobreData = async () => {
    try {
      const response = await fetch('/api/admin/sobre')
      if (response.ok) {
        const data = await response.json()
        setSobreData(data)
        if (data && !selectedSection) {
          setSelectedSection('principal')
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const handleSave = async () => {
    if (!selectedSection || !selectedField) return

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/sobre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: selectedSection,
          field: selectedField,
          value: editedValue,
        }),
      })

      if (response.ok) {
        const updatedData = await response.json()
        setSobreData(updatedData)
        setMessage({ type: 'success', text: 'Texto salvo com sucesso!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Erro ao salvar. Tente novamente.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const handleFieldSelect = (field: string) => {
    setSelectedField(field)
    if (selectedSection && sobreData) {
      let value = ''
      const fieldParts = field.split('.')
      let target: any = sobreData[selectedSection as keyof SobreData]
      
      for (let i = 0; i < fieldParts.length; i++) {
        const part = fieldParts[i]
        // Verificar se é um índice de array
        if (!isNaN(Number(part)) && Array.isArray(target)) {
          const index = Number(part)
          if (target[index] !== undefined) {
            target = target[index]
          } else {
            value = ''
            break
          }
        } else if (target && target[part] !== undefined) {
          target = target[part]
        } else {
          value = ''
          break
        }
      }
      
      if (typeof target === 'string') {
        value = target
      } else {
        value = ''
      }
      
      setEditedValue(value)
    }
  }

  const sectionNames: { [key: string]: string } = {
    principal: 'Página Principal',
    historico: 'Histórico',
    clientes: 'Clientes',
    certificados: 'Certificados',
  }

  const getFieldNames = (section: string) => {
    if (section === 'principal') {
      return {
        'intro': 'Introdução',
        'cards.historico.title': 'Card Histórico - Título',
        'cards.historico.description': 'Card Histórico - Descrição',
        'cards.clientes.title': 'Card Clientes - Título',
        'cards.clientes.description': 'Card Clientes - Descrição',
        'cards.certificados.title': 'Card Certificados - Título',
        'cards.certificados.description': 'Card Certificados - Descrição',
      }
    } else if (section === 'historico') {
      return {
        'subtitle': 'Subtítulo',
        'content': 'Conteúdo',
      }
    } else if (section === 'clientes') {
      return {
        'description': 'Descrição',
      }
    } else if (section === 'certificados') {
      return {
        'description': 'Descrição',
      }
    }
    return {}
  }

  const getPreviewUrl = () => {
    if (selectedSection === 'principal') return '/sobre'
    if (selectedSection === 'historico') return '/sobre/historico'
    if (selectedSection === 'clientes') return '/sobre/clientes'
    if (selectedSection === 'certificados') return '/sobre/certificados'
    return '/sobre'
  }

  if (!sobreData) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.placeholder}>
          <p>Carregando dados...</p>
        </div>
      </div>
    )
  }

  const fieldNames = getFieldNames(selectedSection)

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Editor de Conteúdo - Sobre</h1>
        <p>Edite os textos das páginas de Sobre diretamente aqui</p>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.adminContent}>
        <div className={styles.sidebar}>
          <h2>Selecione a Seção</h2>
          <div className={styles.areaList}>
            {Object.keys(sectionNames).map((key) => (
              <button
                key={key}
                className={`${styles.areaButton} ${selectedSection === key ? styles.active : ''}`}
                onClick={() => {
                  setSelectedSection(key)
                  setSelectedField('')
                  setEditedValue('')
                }}
              >
                {sectionNames[key]}
              </button>
            ))}
          </div>

          {selectedSection && (
            <>
              <h2 style={{ marginTop: '2rem' }}>Selecione o Campo</h2>
              <div className={styles.fieldList}>
                {Object.keys(fieldNames).map((field) => (
                  <button
                    key={field}
                    className={`${styles.fieldButton} ${selectedField === field ? styles.active : ''}`}
                    onClick={() => handleFieldSelect(field)}
                  >
                    {fieldNames[field as keyof typeof fieldNames]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.editor}>
          {selectedSection && selectedField ? (
            <>
              <div className={styles.editorHeader}>
                <h2>
                  {sectionNames[selectedSection]} - {fieldNames[selectedField as keyof typeof fieldNames]}
                </h2>
              </div>
              <div className={styles.editorWrapper}>
                {typeof window !== 'undefined' && (
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
                )}
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
                  href={getPreviewUrl()}
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
              <p>Selecione uma seção e um campo para começar a editar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

