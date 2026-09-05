import express from "express";
import { 
        getStockMovementscontroller,
        getStockMovementByIdController,
        createStockInController,
        createStockOutController
        } 
  from "../controllers/stockMovementControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.get("/",  authorizeRole("admin", "staff", "viewer"),getStockMovementscontroller);
router.get("/:id",  authorizeRole("admin", "staff", "viewer"),getStockMovementByIdController);
router.post("/in", authorizeRole("admin", "staff"),createStockInController);
router.post("/out", authorizeRole("admin", "staff"),createStockOutController);
  
export default router;