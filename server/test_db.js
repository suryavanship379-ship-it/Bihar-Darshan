const { Client } = require('pg');
require('dotenv').config();

async function testConnection(url, name) {
  console.log(`Testing ${name}...`);
  const client = new Client({ connectionString: url, connectionTimeoutMillis: 5000 });
  try {
    await client.connect();
    console.log(`✅ Successfully connected to ${name}`);
    await client.end();
  } catch (err) {
    console.error(`❌ Failed to connect to ${name}:`, err.message);
  }
}

async function run() {
  await testConnection(process.env.DATABASE_URL, 'DATABASE_URL (Port 6543)');
  await testConnection(process.env.DIRECT_URL, 'DIRECT_URL (Port 5432)');
}

run();
