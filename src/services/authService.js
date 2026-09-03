import db from "../config/supabase.js";
import { hashPassword } from "../utils/password.js";

export async function registerUser(name,email,password,role){

  const checkEmailQuery =`SELECT id FROM users WHERE email = $1`;
  const existingUser = await db.query(checkEmailQuery,[email]);

  if (existingUser.rows.length > 0){
    throw new Error("Email sudah terdaftar")
  }
  
  const passwordHash = await hashPassword(password);

  const query = `INSERT INTO users(name,email,password_hash,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role,created_at`;
  const values= [name,email,passwordHash,role];

  const result = await db.query(query,values);

  return result.rows[0];
};
