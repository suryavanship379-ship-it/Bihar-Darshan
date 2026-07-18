const { Client } = require('pg');
require('dotenv').config({ path: 'c:/Users/Shubham/OneDrive/Desktop/Bihar Darshan/Bihar-Darshan/server/.env' });

async function check() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  try {
    await client.connect();
    const res = await client.query('SELECT id, name, slug FROM "Community"');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
