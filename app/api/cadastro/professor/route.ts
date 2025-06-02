import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("Iniciando cadastro de professor...");
    const body = await request.json();
    console.log("Dados recebidos:", { ...body, senha: "[REDACTED]" });
    
    const { nome, email, senha, departamento, instituicao } = body;

    // Validação básica dos campos
    if (!nome || !email || !senha || !departamento || !instituicao) {
      console.log("Campos obrigatórios faltando:", {
        nome: !nome,
        email: !email,
        senha: !senha,
        departamento: !departamento,
        instituicao: !instituicao
      });
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("Verificando email existente...");
    // Verificar se o email já está em uso
    const emailExistente = await prisma.professor.findUnique({
      where: { email },
    });

    if (emailExistente) {
      console.log("Email já em uso:", email);
      return NextResponse.json(
        { message: "Este email já está em uso" },
        { status: 400 }
      );
    }

    console.log("Gerando hash da senha...");
    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    console.log("Criando professor no banco de dados...");
    // Criar o professor no banco de dados
    const professor = await prisma.professor.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        departamento,
        instituicao,
        status: "PENDENTE",
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

    console.log("Professor criado com sucesso:", professor);

    return NextResponse.json(
      {
        message: "Cadastro realizado com sucesso. Aguardando aprovação do administrador.",
        professor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro detalhado ao cadastrar professor:", error);
    // Log adicional para erros específicos do Prisma
    if (error instanceof Error) {
      console.error("Mensagem de erro:", error.message);
      console.error("Stack trace:", error.stack);
    }
    return NextResponse.json(
      { message: "Erro ao realizar cadastro", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
} 