import db from "../config/supabase.js";

// Function Ambil kategori
export const getAllCategories = async () => {
  const result = await db.query (
    `SELECT * FROM categories ORDER BY id ASC` 
  );

  return result.rows;
}

// Function Ambil kategori berdasarkan id
export const getCategoryById = async (id) => {
  const result = await db.query (
    `SELECT * FROM categories WHERE id=$1`, [id]
  );

  return result.rows[0];

}

// Function Tambah kategori
export const createCategory = async (name) => {
  const result = await db.query (
    `INSERT INTO categories (name) 
     VALUES ($1) RETURNING *`,[name]
  );
  return result.rows[0];
}

// Function Update kategori
export const updateCategory = async (id,categoryData) => {
  const { name } = categoryData;
  const result = await db.query (
    `UPDATE categories
     SET name = $1
     WHERE id = $2
     RETURNING *`, [name,id]
  );
  return result.rows[0];
}


// Function Hapus kategori
export const deleteCategory = async (id) => {
  const result = await db.query(
    `DELETE FROM categories
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};