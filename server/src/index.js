import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoute.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  return res.send("HOPAWI Gardens Backend!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});


export default app;
