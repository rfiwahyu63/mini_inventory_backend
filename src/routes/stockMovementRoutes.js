import express from "express";
import { 
        getStockMovementscontroller,
        getStockMovementByIdController,
        addStockIn
        } 
  from "../controllers/stockMovementControllers.js";

const router = express.Router();

router.get("/", getStockMovementscontroller);
router.get("/:id", getStockMovementByIdController);
router.post("/in", addStockIn);
  
export default router;