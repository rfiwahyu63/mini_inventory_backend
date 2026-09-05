import db from "../config/supabase.js";
import { hashPassword } from "../utils/password.js";
import bcrypt from "bcrypt";

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

export async function loginUser(email,password){
  const result = await db.query(
    `SELECT * From users WHERE email =$1`,[email]
  );

  if(result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(
    password, user.password_hash
  );

  if(!passwordMatch){
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}