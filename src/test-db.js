require("dotenv").config();

const pool = require("./config/supabase");

async function testDatabase() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database berhasil terhubung!");
    console.log("waktu database:",result.rows[0].now);
  } catch (error) {
    console.error("Database gagal terhubung!");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

testDatabase();