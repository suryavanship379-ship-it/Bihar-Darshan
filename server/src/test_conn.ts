import "dotenv/config";
import { prisma } from './db';

async function main() {
  console.log("Starting DB connection test...");
  try {
    const userCount = await prisma.user.count();
    console.log("Connection successful! User count:", userCount);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
