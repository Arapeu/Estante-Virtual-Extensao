import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

const handleFileUpload = async (file: File, destination: string) => {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const sanitizedFileName = `${Date.now()}_${file.name.replace(
    /[^a-zA-Z0-9-_\.]/g,
    '_',
  )}`
  const path = join(process.cwd(), destination, sanitizedFileName)

  await writeFile(path, buffer)
  if (destination.includes('covers')) {
    return `/uploads/covers/${sanitizedFileName}`
  }
  return `/uploads/${sanitizedFileName}`
}

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const title = data.get('title') as string
  const author = data.get('author') as string
  const theme = data.get('theme') as string
  const pdfFile: File | null = data.get('pdf') as unknown as File
  const coverImageFile: File | null = data.get('coverImage') as unknown as File
  const accessLevel = (data.get('accessLevel') as string) || 'PUBLIC'

  const validAccessLevels = ['PUBLIC', 'STUDENT_AND_TEACHER', 'TEACHER_ONLY']
  const finalAccessLevel = validAccessLevels.includes(accessLevel) ? accessLevel : 'PUBLIC'

  if (!pdfFile || !title || !author || !theme) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  try {
    const pdfPath = await handleFileUpload(pdfFile, 'public/uploads')
    let coverImagePath: string | undefined

    if (coverImageFile) {
      coverImagePath = await handleFileUpload(coverImageFile, 'public/uploads/covers')
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        theme,
        pdfPath,
        coverImagePath,
        accessLevel: finalAccessLevel,
      },
    })

    return NextResponse.json({ book })
  } catch (error) {
    console.error('Erro ao salvar o livro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ books })
  } catch (error) {
    console.error('Erro ao buscar os livros:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
} 