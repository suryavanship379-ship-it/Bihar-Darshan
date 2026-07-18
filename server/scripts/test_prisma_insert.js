const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../src/generated');
require('dotenv').config({ path: 'c:/Users/Shubham/OneDrive/Desktop/Bihar Darshan/Bihar-Darshan/server/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const user = await prisma.user.findFirst();
    const community = await prisma.community.findFirst();

    if (!user || !community) {
      console.log('User or Community not found in DB');
      return;
    }

    console.log(`Using User ID: ${user.id}, Community ID: ${community.id}`);

    const newPost = await prisma.communityPost.create({
      data: {
        title: 'Prisma Test Video Post',
        content: 'Prisma Test Content',
        mediaUrl: 'data:video/mp4;base64,AAAAFmZ0eXBtcDQyAAAAAG1wNDJpc29tAAAAHHV1aWRfcm5k...',
        mediaType: 'VIDEO',
        authorId: user.id,
        communityId: community.id,
      }
    });

    console.log('Prisma insertion success:', newPost);

    // Clean up
    await prisma.communityPost.delete({
      where: { id: newPost.id }
    });
    console.log('Prisma cleanup success');
  } catch (err) {
    console.error('Prisma insertion error:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
