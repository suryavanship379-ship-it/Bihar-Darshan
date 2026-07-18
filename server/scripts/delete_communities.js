const { Client } = require('pg');
require('dotenv').config({ path: 'c:/Users/Shubham/OneDrive/Desktop/Bihar Darshan/Bihar-Darshan/server/.env' });

async function run() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  try {
    await client.connect();
    console.log('Connected to the library database.');

    // Count records before deletion
    const commCount = await client.query('SELECT COUNT(*) FROM "Community"');
    const memberCount = await client.query('SELECT COUNT(*) FROM "CommunityMember"');
    const postCount = await client.query('SELECT COUNT(*) FROM "CommunityPost"');
    const commentCount = await client.query('SELECT COUNT(*) FROM "PostComment"');

    console.log('\n--- Count BEFORE Delete ---');
    console.log('Communities:', commCount.rows[0].count);
    console.log('CommunityMembers:', memberCount.rows[0].count);
    console.log('CommunityPosts:', postCount.rows[0].count);
    console.log('PostComments:', commentCount.rows[0].count);

    // List communities before deletion
    const commList = await client.query('SELECT id, name, slug FROM "Community"');
    console.log('\nCommunities to delete:', commList.rows);

    if (commList.rows.length === 0) {
      console.log('\nNo communities found to delete.');
      return;
    }

    // Delete all communities
    console.log('\nDeleting all communities (this should cascade delete related posts, members, and comments)...');
    const deleteResult = await client.query('DELETE FROM "Community"');
    console.log(`Deleted ${deleteResult.rowCount} communities.`);

    // Count records after deletion to verify cascades worked
    const commCountAfter = await client.query('SELECT COUNT(*) FROM "Community"');
    const memberCountAfter = await client.query('SELECT COUNT(*) FROM "CommunityMember"');
    const postCountAfter = await client.query('SELECT COUNT(*) FROM "CommunityPost"');
    const commentCountAfter = await client.query('SELECT COUNT(*) FROM "PostComment"');

    console.log('\n--- Count AFTER Delete ---');
    console.log('Communities:', commCountAfter.rows[0].count);
    console.log('CommunityMembers:', memberCountAfter.rows[0].count);
    console.log('CommunityPosts:', postCountAfter.rows[0].count);
    console.log('PostComments:', commentCountAfter.rows[0].count);

  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
