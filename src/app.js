import express from "express";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Mini Inventory API berjalan",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

export default app;