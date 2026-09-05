import express from "express";
import { 
  getProducts,
  getProduct,
  addProduct,
  updateProductById,
  deleteProductById
  } from "../controllers/productControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;