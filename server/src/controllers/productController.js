import supabase from "../supabaseClient.js";

export const getProducts = async (req, res) => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("created_at");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(data);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addProduct = async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, description, price, path, rating, reviews } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const { data, error } = await supabase
    .from("product")
    .insert([{ name, description, price, path, rating, reviews }])
    .select();
    
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};
