import express from "express";
import { 
        getStockMovementscontroller,
        getStockMovementByIdController,
        createStockInController,
        createStockOutController
        } 
  from "../controllers/stockMovementControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken); // Apply authentication middleware to all routes

router.get("/", getStockMovementscontroller);
router.get("/:id", getStockMovementByIdController);
router.post("/in", createStockInController);
router.post("/out", createStockOutController);
  
export default router;