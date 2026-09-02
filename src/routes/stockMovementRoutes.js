import express from "express";
import { 
        getStockMovementscontroller,
        getStockMovementByIdController,
        createStockInController,
        createStockOutController
        } 
  from "../controllers/stockMovementControllers.js";

const router = express.Router();

router.get("/", getStockMovementscontroller);
router.get("/:id", getStockMovementByIdController);
router.post("/in", createStockInController);
router.post("/out", createStockOutController);
  
export default router;