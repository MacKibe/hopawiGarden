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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, active, category } = req.body;

    const { data, error } = await supabase
      .from('product')
      .update({ 
        name, 
        description, 
        price, 
        stock, 
        active, 
        category,
        updated_at: new Date() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('product')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, path, rating, reviews, stock, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const { data, error } = await supabase
      .from('product')
      .insert([{ 
        name, 
        description, 
        price, 
        path, 
        rating: rating || 0, 
        reviews: reviews || 0,
        stock: stock || 0,
        category: category || 'plants',
        active: true 
      }])
      .select();
      
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};