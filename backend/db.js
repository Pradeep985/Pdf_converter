const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.PG_URI) {
  pool = new Pool({
    connectionString: process.env.PG_URI,
    ssl: { rejectUnauthorized: false }
  });
}

// Initialize the table if it doesn't exist
async function initDb() {
  if (!pool) return;
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS usage_stats (
        id SERIAL PRIMARY KEY,
        total_processed INT NOT NULL DEFAULT 0
      );
    `);
    
    // Ensure there is at least one row
    const result = await client.query('SELECT COUNT(*) FROM usage_stats');
    if (parseInt(result.rows[0].count) === 0) {
      await client.query('INSERT INTO usage_stats (total_processed) VALUES (0)');
    }
    client.release();
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
}

async function incrementStat() {
  if (!pool) return;
  try {
    await pool.query('UPDATE usage_stats SET total_processed = total_processed + 1 WHERE id = 1');
  } catch (err) {
    console.error('Failed to increment stat:', err);
  }
}

async function getStats() {
  if (!pool) return { total_processed: 0 };
  try {
    const result = await pool.query('SELECT total_processed FROM usage_stats WHERE id = 1');
    return result.rows[0];
  } catch (err) {
    console.error('Failed to get stats:', err);
    return { total_processed: 0 };
  }
}

module.exports = {
  pool,
  initDb,
  incrementStat,
  getStats
};
