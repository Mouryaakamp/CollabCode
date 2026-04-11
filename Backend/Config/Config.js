import dotenv from "dotenv";

dotenv.configDotenv()

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not defined in .env")
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in .env")
}

const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

export default config;