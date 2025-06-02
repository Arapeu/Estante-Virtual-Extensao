import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const professores = await prisma.professor.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        departamento: true,
        instituicao: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ professores });
  } catch (error) {
    console.error("Erro ao listar professores:", error);
    return NextResponse.json(
      { message: "Erro ao listar professores" },
      { status: 500 }
    );
  }
} 