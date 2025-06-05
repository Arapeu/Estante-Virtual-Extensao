import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

const dbConfig = {
    type: "postgres" as const,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "estante_virtual",
    synchronize: true,
    logging: true,
    entities: [User],
    ssl: false
};

console.log("Database configuration:", {
    ...dbConfig,
    password: "****" // Não logar a senha real
});

export const AppDataSource = new DataSource(dbConfig); 