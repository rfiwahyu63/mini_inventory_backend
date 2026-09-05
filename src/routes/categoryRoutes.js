import express from "express";
import 
{ getCategoriesController,
  getCategoryByIdController,
  addCategory,
  updateCategoryById,
  deleteCategoryById
} 
  from "../controllers/categoryControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.get("/", getCategoriesController);
router.get("/:id", getCategoryByIdController);
router.post("/", addCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);
  
export default router;