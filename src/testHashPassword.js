import { hashPassword,
       comparePassword } 
       from "./utils/password.js";

const password = "rahasia123"

const hashedPassword = await hashPassword(password);

const isMatch = await comparePassword(password,hashedPassword);

const wrongPassword = "salah123";

const isWrongMatch = await comparePassword(wrongPassword,hashedPassword);

console.log("password asli:",password);
console.log("password hash:",hashedPassword);
console.log("password cocok:",isMatch);
console.log("password tidak cocok:",isWrongMatch);
