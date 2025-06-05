import { NextResponse } from "next/server"
import { prisma } from "../../../src/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    try {
        const { email, password, role } = await request.json()

        // Se for visitante, não precisa de autenticação
        if (role === "VISITOR") {
            return NextResponse.json({
                user: {
                    role: "VISITOR"
                },
                token: jwt.sign(
                    { role: "VISITOR" },
                    process.env.JWT_SECRET || "sua_chave_secreta",
                    { expiresIn: "1d" }
                )
            })
        }

        // Buscar usuário pelo email
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: "Email ou senha inválidos" },
                { status: 401 }
            )
        }

        // Verificar se o usuário tem a role correta
        if (user.role !== role) {
            return NextResponse.json(
                { error: "Tipo de usuário incorreto" },
                { status: 401 }
            )
        }

        // Verificar senha
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Email ou senha inválidos" },
                { status: 401 }
            )
        }

        // Gerar token JWT
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || "sua_chave_secreta",
            { expiresIn: "1d" }
        )

        // Remover a senha do objeto retornado
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            user: userWithoutPassword,
            token
        })
    } catch (error) {
        console.error("Erro ao fazer login:", error)
        return NextResponse.json(
            { error: "Erro ao fazer login" },
            { status: 500 }
        )
    }
} 