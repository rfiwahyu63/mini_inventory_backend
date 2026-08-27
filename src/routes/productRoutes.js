import express from "express";
import { 
  getProducts,
  getProduct,
  addProduct,
  updateProductById,
  deleteProductById
  } from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;