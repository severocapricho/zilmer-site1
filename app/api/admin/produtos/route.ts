import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

const PRODUTOS_PATH = join(process.cwd(), 'data', 'produtos.json')

export async function GET() {
  try {
    const file = await readFile(PRODUTOS_PATH, 'utf-8')
    const data = JSON.parse(file)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao carregar produtos.json:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar dados de produtos' },
      { status: 500 }
    )
  }
}

