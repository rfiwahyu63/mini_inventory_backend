console.log("FILE INI JALAN");
import dotenv from "dotenv";
dotenv.config();

import db from "./config/supabase.js";

async function testDatabase() {
  try {
    const result = await db.query("SELECT NOW()");
    
    console.log("Database berhasil terhubung!");
    console.log("waktu database:",result.rows[0].now);
    
  } catch (error) {
    
    console.error("Database gagal terhubung!");
    console.error(error.message);
    
  } finally {
    await db.end();
  }
}

testDatabase();