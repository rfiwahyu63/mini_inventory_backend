require("dotenv").config();

const supabase = require("./config/supabase.js");

async function testDatabase() {
  try {
    const result = await supabase.query("SELECT NOW()");
    console.log("Database berhasil terhubung!");
    console.log("waktu database:",result.rows[0].now);
  } catch (error) {
    console.error("Database gagal terhubung!");
    console.error(error.message);
  } finally {
    await supabase.end();
  }
}

testDatabase();