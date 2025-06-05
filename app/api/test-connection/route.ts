import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
    try {
        // Tenta criar um usuário de teste
        const testUser = await prisma.user.create({
            data: {
                name: "Usuário Teste",
                email: `teste${Date.now()}@teste.com`,
                password: "123456",
                role: "STUDENT"
            }
        });

        // Se chegou aqui, a conexão está funcionando
        return NextResponse.json({ 
            message: "Database connection successful!",
            testUser: {
                id: testUser.id,
                name: testUser.name,
                email: testUser.email,
                role: testUser.role
            }
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json(
            { 
                error: "Failed to connect to database",
                details: error.message
            },
            { status: 500 }
        );
    }
} 