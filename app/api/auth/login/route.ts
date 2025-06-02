import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, senha, tipo } = body;

    if (!email || !senha || !tipo) {
      return NextResponse.json(
        { message: "Email, senha e tipo são obrigatórios" },
        { status: 400 }
      );
    }

    if (tipo === "professor") {
      const professor = await prisma.professor.findUnique({
        where: { email },
      });

      if (!professor) {
        return NextResponse.json(
          { message: "Email ou senha inválidos" },
          { status: 401 }
        );
      }

      if (professor.status === "PENDENTE") {
        return NextResponse.json(
          { message: "Aguardando aprovação do administrador" },
          { status: 403 }
        );
      }

      if (professor.status === "REJEITADO") {
        return NextResponse.json(
          { message: "Seu cadastro foi rejeitado. Entre em contato com o administrador." },
          { status: 403 }
        );
      }

      const senhaValida = await bcrypt.compare(senha, professor.senha);
      if (!senhaValida) {
        return NextResponse.json(
          { message: "Email ou senha inválidos" },
          { status: 401 }
        );
      }

      // Registrar o acesso
      await prisma.acesso.create({
        data: {
          professorId: professor.id,
        },
      });

      const { senha: _, ...professorSemSenha } = professor;
      return NextResponse.json({
        message: "Login realizado com sucesso",
        user: professorSemSenha,
        tipo: "professor",
      });
    } else if (tipo === "aluno") {
      const aluno = await prisma.aluno.findUnique({
        where: { email },
      });

      if (!aluno) {
        return NextResponse.json(
          { message: "Email ou senha inválidos" },
          { status: 401 }
        );
      }

      const senhaValida = await bcrypt.compare(senha, aluno.senha);
      if (!senhaValida) {
        return NextResponse.json(
          { message: "Email ou senha inválidos" },
          { status: 401 }
        );
      }

      // Registrar o acesso
      await prisma.acesso.create({
        data: {
          alunoId: aluno.id,
        },
      });

      const { senha: _, ...alunoSemSenha } = aluno;
      return NextResponse.json({
        message: "Login realizado com sucesso",
        user: alunoSemSenha,
        tipo: "aluno",
      });
    }

    return NextResponse.json(
      { message: "Tipo de usuário inválido" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return NextResponse.json(
      { message: "Erro ao realizar login" },
      { status: 500 }
    );
  }
} 