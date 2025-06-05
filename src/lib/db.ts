import { AppDataSource } from "../config/database";

export async function testConnection() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        console.log("Database connection successful!");
        return true;
    } catch (error) {
        console.error("Error connecting to database:", {
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack
        });
        return false;
    }
} 