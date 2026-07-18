const { Client } = require('pg');
require('dotenv').config({ path: 'c:/Users/Shubham/OneDrive/Desktop/Bihar Darshan/Bihar-Darshan/server/.env' });

async function migrate() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  try {
    await client.connect();
    console.log('Connected. Running migrations...');

    // 1. Add views column to CommunityPost (safe: do nothing if already exists)
    await client.query(`
      ALTER TABLE "CommunityPost"
      ADD COLUMN IF NOT EXISTS "views" INTEGER NOT NULL DEFAULT 0;
    `);
    console.log('✅ Added views column to CommunityPost');

    // 2. Create PostComment table (self-referencing for replies)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "PostComment" (
        "id"        TEXT        NOT NULL DEFAULT gen_random_uuid()::text,
        "content"   TEXT        NOT NULL,
        "postId"    TEXT        NOT NULL,
        "authorId"  TEXT        NOT NULL,
        "parentId"  TEXT,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "PostComment_postId_fkey"   FOREIGN KEY ("postId")   REFERENCES "CommunityPost"("id") ON DELETE CASCADE,
        CONSTRAINT "PostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id")          ON DELETE CASCADE,
        CONSTRAINT "PostComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "PostComment"("id")   ON DELETE CASCADE
      );
    `);
    console.log('✅ Created PostComment table');

    console.log('\n🎉 Migration complete!');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  } finally {
    await client.end();
  }
}

migrate();
