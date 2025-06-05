import { NextResponse } from "next/server";
import { initializeDatabase } from "@/src/lib/init-db";

export async function GET() {
    try {
        const dataSource = await initializeDatabase();
        return NextResponse.json({ 
            message: "Database connection successful!",
            isInitialized: dataSource.isInitialized
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