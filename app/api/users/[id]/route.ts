import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Deletar o usuário
    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar o usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
} 