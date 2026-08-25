import db from "../config/supabase.js";

export const getAllProducts = async () => {
  const result = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );

  return result.rows;
};