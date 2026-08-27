import db from "../config/supabase.js";

// Function Ambil categori
export const getAllCategories = async () => {
  const result = await db.query (
    `SELECT * FROM categories ORDER BY id ASC` 
  );

  return reault.rows;
}

