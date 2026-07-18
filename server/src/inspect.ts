import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const { prisma: db } = require('./db');

  const post = await db.communityPost.findUnique({
    where: { id: 'a9ec9316-c6e3-4642-ac6f-6db5d4ded977' }
  });

  console.log('COMMUNITY ID:', post?.communityId);
}

run().catch(console.error);
