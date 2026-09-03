import { registerUsers } from "../services/authService.js"

export async function registerController(req,res){
  try {
    const {name,email,password,role} = req.body;
    const newUser = await registerUsers(name,email,password,role);
  } catch (error) {
    
  }
}