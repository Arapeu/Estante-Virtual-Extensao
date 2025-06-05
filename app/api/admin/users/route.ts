import { NextResponse } from "next/server"
import { prisma } from "../../../../src/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          in: ["STUDENT", "TEACHER"]
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        institution: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    )
  }
} 