import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  return res.send("HOPAWI Gardens Backend!"); // Send a welcome message
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
