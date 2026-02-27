import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const SOBRE_PATH = join(process.cwd(), 'data', 'sobre.json')

async function loadSobre() {
  const file = await readFile(SOBRE_PATH, 'utf-8')
  return JSON.parse(file)
}

export async function GET() {
  try {
    const data = await loadSobre()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao carregar sobre.json:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar dados de sobre' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, field, value } = body as {
      section?: string
      field?: string
      value?: unknown
    }

    if (!section || !field) {
      return NextResponse.json(
        { error: 'Parâmetros \"section\" e \"field\" são obrigatórios' },
        { status: 400 }
      )
    }

    const data = await loadSobre()

    if (!data[section]) {
      return NextResponse.json(
        { error: `Seção '${section}' não encontrada em sobre.json` },
        { status: 404 }
      )
    }

    // Navegar até o campo solicitado (ex: "cards.historico.title")
    const path = field.split('.')
    let target: any = data[section]

    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i]
      if (target[key] === undefined || target[key] === null) {
        target[key] = {}
      }
      target = target[key]
    }

    const lastKey = path[path.length - 1]
    target[lastKey] = value

    await writeFile(SOBRE_PATH, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao atualizar sobre.json:', error)
    return NextResponse.json(
      { error: error?.message || 'Erro ao atualizar dados de sobre' },
      { status: 500 }
    )
  }
}

