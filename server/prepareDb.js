require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('./src/generated');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE "Community" RENAME COLUMN "image" TO "bannerImageUrl";');
    console.log("Renamed image to bannerImageUrl");
  } catch (e) {
    console.error("Error renaming:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
run();
