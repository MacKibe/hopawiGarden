import supabase from "../supabaseClient.js";

export const getProducts = async (req, res) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("created_at");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const addProduct = async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, description, price, image, rating, reviews } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const { data, error } = await supabase
    .from("product")
    .insert([{ name, description, price, image, rating, reviews }])
    .select();
    
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};
