import { NextResponse } from "next/server"
import { prisma } from "../../../src/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try {
        const { name, email, password, cpf, institution, role } = await request.json()

        // Verificar se o email já está em uso
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        })

        if (existingEmail) {
            return NextResponse.json(
                { error: "Este email já está em uso" },
                { status: 400 }
            )
        }

        // Verificar se o CPF já está em uso (apenas se for fornecido)
        if (cpf) {
            const existingCPF = await prisma.user.findUnique({
                where: { cpf }
            })

            if (existingCPF) {
                return NextResponse.json(
                    { error: "Este CPF já está cadastrado" },
                    { status: 400 }
                )
            }
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10)

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cpf: cpf || null,
                institution: institution || null,
                role
            }
        })

        // Remover a senha do objeto retornado
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        console.error("Erro ao registrar usuário:", error)
        return NextResponse.json(
            { error: "Erro ao registrar usuário" },
            { status: 500 }
        )
    }
} 