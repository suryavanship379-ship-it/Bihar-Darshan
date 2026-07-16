import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("WARNING: DATABASE_URL environment variable is missing.");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

export default prisma;
