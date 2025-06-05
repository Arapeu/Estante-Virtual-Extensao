import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
    try {
        // Tenta fazer uma query simples para testar a conexão
        const userCount = await prisma.user.count();
        
        return NextResponse.json({ 
            message: "Database connection successful!",
            userCount
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