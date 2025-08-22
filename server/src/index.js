import express from "express";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js'

const app = express();

dotenv.config();

const supabaseUrl = process.env.PROJECT_URL
const supabaseKey = process.env.PROJECT_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log(supabase);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to my Web App!");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});

export default app;
