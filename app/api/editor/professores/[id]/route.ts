import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["APROVADO", "REJEITADO"].includes(status)) {
      return NextResponse.json(
        { message: "Status inválido" },
        { status: 400 }
      );
    }

    const professor = await prisma.professor.update({
      where: { id },
      data: { status },
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

    return NextResponse.json({
      message: "Status atualizado com sucesso",
      professor,
    });
  } catch (error) {
    console.error("Erro ao atualizar status do professor:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
} 