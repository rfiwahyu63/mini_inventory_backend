import { registerUser,loginUser } from "../services/authService.js";

export async function registerController(req,res){
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name,email,password dan role wajib diisi",
      });
    }

    const allowedRoles = ["admin", "staff", "viewer"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message:
          "Role tidak valid. Role harus salah satu dari: admin, staff, viewer",
      });
    }

    const emailPatttern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPatttern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email tidak valid",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password harus memiliki panjang minimal 8 karakter",
      });
    }

    const newUser = await registerUser(name, email, password, role);
    return res.status(201).json({
      success: true,
      message: "User berhasil didaftarkan",
      data: newUser,
    });

  } catch (error) {
    console.error(error);

    if (error.message === "Email sudah digunakan"){
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}


export async function loginController(req,res) {
  try {
      const {email,password} = req.body;
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Email dan password wajib diisi",
        });
      }
      
      const user = await loginUser(email,password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email atau password salah",
        });
      } 
        return res.status(200).json({
          success: true,
          message: "Login Berhasil",
          data: user,
        });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server",
      });
  }
}
