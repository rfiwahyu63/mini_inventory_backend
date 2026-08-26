import db from "../config/supabase.js";

// Function Ambil semua product
export const getAllProducts = async () => {
  const result = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC",
  );

  return result.rows;
};

// Function Ambil product berdasarkan id
export const getProductById = async (id) => {
  const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// Function Tambah product
export const createProduct = async (productData) => {
  const { category_id, name, sku, stock, min_stock, price } = productData;

  const result = await db.query(
    `INSERT INTO products(
        category_id,
        name,
        sku,
        stock,
        min_stock,
        price)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
    [category_id, name, sku, stock, min_stock, price],
  );

  return result.rows[0];
};

// Function update product
export const updateProduct = async (id, productData) => {
  const { category_id, name, sku, stock, min_stock, price } = productData;

  const result = await db.query(
    `UPDATE products
      SET category_id=$1,
          name=$2,
          sku=$3,
          stock=$4,
          min_stock=$5,
          price=$6
          WHERE id=$7
          RETURNING *`,
    [category_id, name, sku, stock, min_stock, price, id],
  );

  return result.rows[0];
};

// Function Delete Product
export const deleteProduct = async (id) => {
  const result = await db.query(
    `DELETE FROM products
      WHERE id=$1
      RETURNING *`,
    [id],
  );

  return result.rows[0];
};
