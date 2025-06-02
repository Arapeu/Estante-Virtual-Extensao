import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("Iniciando cadastro de aluno...");
    const body = await request.json();
    console.log("Dados recebidos:", { ...body, senha: "[PROTEGIDO]" });

    const { nome, email, senha, matricula, curso, instituicao } = body;

    // Validação básica dos campos
    if (!nome || !email || !senha || !matricula || !curso || !instituicao) {
      console.log("Campos obrigatórios faltando:", {
        nome: !nome ? "Nome não fornecido" : "OK",
        email: !email ? "Email não fornecido" : "OK",
        senha: !senha ? "Senha não fornecida" : "OK",
        matricula: !matricula ? "Matrícula não fornecida" : "OK",
        curso: !curso ? "Curso não fornecido" : "OK",
        instituicao: !instituicao ? "Instituição não fornecida" : "OK"
      });
      return NextResponse.json(
        { mensagem: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("Verificando email existente...");
    // Verificar se o email já está em uso
    const emailExistente = await prisma.aluno.findUnique({
      where: { email },
    });

    if (emailExistente) {
      console.log("Email já em uso:", email);
      return NextResponse.json(
        { mensagem: "Este email já está em uso" },
        { status: 400 }
      );
    }

    console.log("Verificando matrícula existente...");
    // Verificar se a matrícula já está em uso
    const matriculaExistente = await prisma.aluno.findUnique({
      where: { matricula },
    });

    if (matriculaExistente) {
      console.log("Matrícula já em uso:", matricula);
      return NextResponse.json(
        { mensagem: "Esta matrícula já está em uso" },
        { status: 400 }
      );
    }

    console.log("Gerando hash da senha...");
    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    console.log("Criando aluno no banco de dados...");
    // Criar o aluno no banco de dados
    const aluno = await prisma.aluno.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        matricula,
        curso,
        instituicao,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        matricula: true,
        curso: true,
        instituicao: true,
        createdAt: true,
      },
    });

    console.log("Aluno criado com sucesso:", aluno);

    return NextResponse.json(
      {
        mensagem: "Cadastro realizado com sucesso",
        aluno,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro detalhado ao cadastrar aluno:", error);
    // Log adicional para erros específicos do Prisma
    if (error instanceof Error) {
      console.error("Mensagem de erro:", error.message);
      console.error("Rastreamento do erro:", error.stack);
      // Log adicional para erros do Prisma
      if ('code' in error) {
        console.error("Código do erro:", (error as any).code);
      }
      if ('meta' in error) {
        console.error("Detalhes adicionais do erro:", (error as any).meta);
      }
    }
    // Log do estado do Prisma
    console.log("Estado da conexão com o banco de dados:", {
      conexaoAtiva: await prisma.$queryRaw`SELECT 1`.catch(() => false),
      urlBancoDados: process.env.DATABASE_URL ? "Configurada" : "Não configurada"
    });
    
    return NextResponse.json(
      { 
        mensagem: "Erro ao realizar cadastro", 
        erro: error instanceof Error ? error.message : "Erro desconhecido",
        detalhes: error instanceof Error ? {
          tipo: error.name,
          codigo: 'code' in error ? (error as any).code : undefined,
          informacoes: 'meta' in error ? (error as any).meta : undefined
        } : undefined
      },
      { status: 500 }
    );
  }
} 