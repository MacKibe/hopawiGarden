import supabase from "../supabaseClient.js";

/**
 * Get all products with optional filtering
 */
export const getProducts = async (req, res) => {
  try {
    const { category, active } = req.query;
    
    let query = supabase.from("product").select("*");
    
    // Apply filters if provided
    if (category) {
      query = query.eq('category', category);
    }
    
    if (active !== undefined) {
      query = query.eq('active', active === 'true');
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Get products error:', error);
      return res.status(500).json({ error: error.message });
    }
    
    res.json(data || []);
  } catch (error) {
    console.error('Get products exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("product_id", id)
      .single();

    if (error) {
      console.error('Get product by ID error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(data);
  } catch (error) {
    console.error('Get product by ID exception:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { 
      name, 
      description, 
      price,
      active, 
      category, 
      path
    } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const updateData = {
      name: name.trim(),
      description: description?.trim() || '',
      price: Math.round(parseFloat(price)),
      active: active !== undefined ? active : true,
      category: category || 'indoor',
      path: path?.trim() || ''
    };

    console.log('Updating product:', { product_id, updateData });

    const { data, error } = await supabase
      .from('product')
      .update(updateData)
      .eq('product_id', product_id)
      .select()
      .single();

    if (error) {
      console.error('Update product error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Product updated successfully:', data);
    res.json(data);
  } catch (error) {
    console.error('Update product exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const { error } = await supabase
      .from('product')
      .delete()
      .eq('product_id', id);

    if (error) {
      console.error('Delete product error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ 
      success: true,
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Delete product exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

/**
 * Create a new product
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name, 
      description, 
      price, 
      path,
      category,
      active 
    } = req.body;

    console.log('Creating product with data:', req.body);

    // Validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    if (price < 0) {
      return res.status(400).json({ error: 'Price cannot be negative' });
    }

    // Prepare data - ensure proper types and trim strings
    const productData = {
      name: name.trim(),
      description: description?.trim() || '',
      price: Math.round(parseFloat(price)),
      path: path?.trim() || null, // Use null instead of empty string
      category: category || 'indoor',
      active: active !== undefined ? active : true,
      created_at: new Date().toISOString()
    };

    console.log('Processed product data:', productData);

    const { data, error } = await supabase
      .from('product')
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('Product created successfully:', data);
    res.status(201).json(data);
    
  } catch (error) {
    console.error('Create product exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};
