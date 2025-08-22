import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to my Web App!");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4090");
});

export default app;
