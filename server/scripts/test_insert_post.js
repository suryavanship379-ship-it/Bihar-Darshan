const { Client } = require('pg');
require('dotenv').config({ path: 'c:/Users/Shubham/OneDrive/Desktop/Bihar Darshan/Bihar-Darshan/server/.env' });

async function insert() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  try {
    await client.connect();
    // Get a user ID
    const usersRes = await client.query('SELECT id FROM "User" LIMIT 1');
    if (usersRes.rows.length === 0) {
      console.log('No user found');
      return;
    }
    const userId = usersRes.rows[0].id;
    const communityId = '46d935f0-5522-4919-b025-64395666edcc'; // Bihar Tech Enthusiasts

    console.log(`Using User: ${userId}, Community: ${communityId}`);

    // Try inserting a post with video mediaType manually
    const query = `
      INSERT INTO "CommunityPost" (id, title, content, "mediaUrl", "mediaType", "authorId", "communityId", status, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING *
    `;
    const values = [
      'test-video-post-id-1234',
      'Test Video Title',
      'Test Video Content',
      'data:video/mp4;base64,AAAAFmZ0eXBtcDQyAAAAAG1wNDJpc29tAAAAHHV1aWRfcm5k...', // Dummy video base64
      'VIDEO',
      userId,
      communityId,
      'APPROVED'
    ];

    const result = await client.query(query, values);
    console.log('Insert success:', result.rows[0]);

    // Clean up
    await client.query('DELETE FROM "CommunityPost" WHERE id = $1', ['test-video-post-id-1234']);
    console.log('Cleanup success');
  } catch (err) {
    console.error('Error inserting video post:', err);
  } finally {
    await client.end();
  }
}

insert();
