import express from "express";
import { 
  getProducts,
  getProduct,
  addProduct,
  updateProductById,
  deleteProductById
  } from "../controllers/productControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.get("/", authorizeRole("admin","staff","viewer"),getProducts);
router.get("/:id", authorizeRole("admin", "staff", "viewer"),getProduct);
router.post("/",  authorizeRole("admin"),addProduct);
router.put("/:id", authorizeRole("admin"),updateProductById);
router.delete("/:id", authorizeRole("admin"),deleteProductById);

export default router;