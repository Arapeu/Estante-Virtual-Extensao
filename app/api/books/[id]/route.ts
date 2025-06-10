import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    // 1. Encontrar o livro no banco de dados para obter o caminho do PDF
    const book = await prisma.book.findUnique({
      where: { id },
    })

    if (!book) {
      return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 })
    }

    // Função auxiliar para deletar arquivos
    const deleteFile = async (filePathToDelete: string | null) => {
      if (!filePathToDelete) return
      const fullPath = join(process.cwd(), 'public', filePathToDelete)
      try {
        await unlink(fullPath)
      } catch (fileError: any) {
        if (fileError.code !== 'ENOENT') {
          console.error(`Erro ao deletar o arquivo: ${fullPath}`, fileError)
        }
      }
    }

    // 2. Deletar o arquivo PDF e a imagem da capa
    await Promise.all([deleteFile(book.pdfPath), deleteFile(book.coverImagePath)])

    // 3. Deletar o registro do livro do banco de dados
    await prisma.book.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Livro deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar o livro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
} 