export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
  
  const userRole = req.user.role;
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak. Anda tidak memiliki izin untuk mengakses resource ini.",
    });
  } 
  next();
  }
}