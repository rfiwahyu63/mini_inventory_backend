import express from "express";
import productRoutes from ".routes/productRoutes.js";

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req,res) => {
  res.json({
    message: "Mini inventory API berjalan",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
});

export default app;