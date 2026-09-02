import db from "../config/supabase.js";

export const getAllStockMovements = async () => {
  const result = await db.query(
    `SELECT * FROM stock_movements
        ORDER BY created_at DESC`,
  );

  return result.rows;
};

export const getStockMovementById = async (id) => {
  const result = await db.query(
    `SELECT * FROM stock_movements
        WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

export const createStockIn = async (productId, userId, quantity, note) => {
  if (quantity <= 0) {
    throw new Error("Quantity harus lebih dari 0");
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `UPDATE products
      SET stock = stock + $1
      WHERE id = $2
      RETURNING *`,
      [quantity, productId],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    const movementResult = await client.query(
      `INSERT INTO stock_movements
      (product_id, user_id, type, quantity, note)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [productId, userId, "in", quantity, note],
    );

    await client.query("COMMIT");

    return {
      product: result.rows[0],
      movement: movementResult.rows[0],
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};



export const createStockOut = async (stockMovementData) => {
   const { product_id, user_id, quantity, note } = stockMovementData;
   const productResult = await db.query(
     `SELECT * FROM products 
      WHERE id = $1`, [product_id]
   );

  if (productResult.rows.length === 0 ) {
    return null;
  }

  const product = productResult.rows[0];
   if (product.stock < quantity ) {
     return ("INSUFFICIENT_STOCK")
   }

  const updateProduct = await db.query(
    `UPDATE products
     SET stock = stock - $1
     WHERE id = $2
     RETURNING *`,
    [quantity,product_id]
  );

  const movementResult = await db.query(
    `INSERT INTO stock_movements
    (product_id,user_id,type,quantity,note)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [product_id,user_id,"out",quantity,note]
  );

   return movementResult.rows[0];
};