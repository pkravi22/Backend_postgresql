// config/initDb.js
import pool from "./db.js";

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      )
    `);
    console.log("✅ Users table is ready");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}

export default initDb;
