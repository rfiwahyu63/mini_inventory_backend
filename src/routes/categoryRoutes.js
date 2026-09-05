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
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.get("/",  authorizeRole("admin", "staff", "viewer"),getCategoriesController);
router.get("/:id",  authorizeRole("admin", "staff", "viewer"),getCategoryByIdController);
router.post("/", authorizeRole("admin"),addCategory);
router.put("/:id", authorizeRole("admin"),updateCategoryById);
router.delete("/:id", authorizeRole("admin"),deleteCategoryById);
  
export default router;