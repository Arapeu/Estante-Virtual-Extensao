import { AppDataSource } from "../config/database";

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connection initialized");
    } catch (error) {
        console.error("Error during database initialization:", error);
        throw error;
    }
}; 