require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });

async function run() {
  try {
    // Add columns manually to avoid Prisma db push data loss
    await pool.query(`ALTER TABLE "Community" ADD COLUMN IF NOT EXISTS "slug" TEXT UNIQUE;`);
    
    // Set unique slugs for existing communities
    const { rows } = await pool.query(`SELECT id, name FROM "Community" WHERE slug IS NULL;`);
    for (const row of rows) {
      const slug = row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
      await pool.query(`UPDATE "Community" SET slug = $1 WHERE id = $2;`, [slug, row.id]);
    }
    
    // Make slug NOT NULL
    await pool.query(`ALTER TABLE "Community" ALTER COLUMN "slug" SET NOT NULL;`);

    console.log("Successfully prepared Community table for db push.");
  } catch (e) {
    console.error("Error preparing DB:", e.message);
  } finally {
    await pool.end();
  }
}
run();
