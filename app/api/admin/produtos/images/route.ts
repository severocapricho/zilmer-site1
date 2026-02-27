import { NextResponse } from 'next/server'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    if (!category) {
      return NextResponse.json(
        { error: 'Categoria não especificada' },
        { status: 400 }
      )
    }

    // Mapear categorias para pastas
    const folderMap: { [key: string]: string } = {
      oleo: 'public/images/produtos/oleo',
      seco: 'public/images/produtos/seco',
      instrumentos: 'public/images/produtos/instrumentos',
    }

    const baseFolder = folderMap[category]
    if (!baseFolder) {
      return NextResponse.json(
        { error: `Categoria '${category}' não encontrada` },
        { status: 404 }
      )
    }

    const images: string[] = []

    // Função recursiva para buscar imagens
    const findImages = (dir: string, basePath: string = '') => {
      try {
        const files = readdirSync(dir)
        files.forEach((file) => {
          const fullPath = join(dir, file)
          const relativePath = basePath ? `${basePath}/${file}` : file
          const stat = statSync(fullPath)

          if (stat.isDirectory()) {
            findImages(fullPath, relativePath)
          } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
            // Remover 'public' do caminho para usar no site
            const imagePath = `/images/produtos/${category}/${relativePath.replace(/\\/g, '/')}`
            images.push(imagePath)
          }
        })
      } catch (error) {
        console.error(`Erro ao ler diretório ${dir}:`, error)
      }
    }

    findImages(baseFolder)

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Erro ao buscar imagens:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar imagens' },
      { status: 500 }
    )
  }
}
