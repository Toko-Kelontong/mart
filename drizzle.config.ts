import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env" });

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./supabase/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL || "",
        port: 5432,
        host: "aws-0-us-east-1.pooler.supabase.com",
        user: "postgres.iubeceujfzunpdtxzwmt",
        password: process.env.PW || "",
    },
});
