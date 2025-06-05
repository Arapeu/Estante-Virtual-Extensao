import { AppDataSource } from "../config/database";

let isInitialized = false;

export async function initializeDatabase() {
    if (isInitialized) {
        return AppDataSource;
    }

    try {
        console.log("Attempting to initialize database connection...");
        
        if (!AppDataSource.isInitialized) {
            console.log("Initializing database connection...");
            await AppDataSource.initialize();
            console.log("Database connection initialized successfully");
            isInitialized = true;
        } else {
            console.log("Database connection already initialized");
        }
        
        return AppDataSource;
    } catch (error) {
        console.error("Error during database initialization:", {
            name: error.name,
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack
        });
        throw error;
    }
} 