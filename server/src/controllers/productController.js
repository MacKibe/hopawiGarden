import supabase from "../supabaseClient.js";

/**
 * Get all products with optional filtering
 */
export const getProducts = async (req, res) => {
  try {
    const { category, active } = req.query;
    
    let query = supabase.from("product").select(`
      *,
      planter (*),
      product_images (*)
    `);
    
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
    
    // Format products with images and planter_details
    const formattedProducts = data?.map(product => ({
      ...product,
      planter_details: product.planter ? {
        type: product.planter.type,
        size: product.planter.size,
        color: product.planter.color
      } : null,
      images: product.product_images || []
    })) || [];

    // Remove nested objects
    formattedProducts.forEach(product => {
      delete product.planter;
      delete product.product_images;
    });
    
    res.json(formattedProducts);
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

    console.log('Fetching product with ID:', id);

    // Get product data
    const { data: product, error: productError } = await supabase
      .from("product")
      .select(`
        *,
        planter (*),
        product_images (*)
      `)
      .eq("product_id", id)
      .single();

    if (productError) {
      console.error('Get product by ID error:', productError);
      return res.status(500).json({ error: productError.message });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log('Raw product data from DB:', product);
    console.log('Product images from DB:', product.product_images);

    // Format the response - use images from product_images table
    const response = {
      ...product,
      planter_details: product.planter ? {
        type: product.planter.type,
        size: product.planter.size,
        color: product.planter.color
      } : null,
      images: product.product_images || [] // Use images from product_images table
    };

    // Remove the nested objects
    delete response.planter;
    delete response.product_images;

    console.log('Final response with images:', response.images);

    res.json(response);
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
      path, // Keep for backward compatibility but don't rely on it
      planter_details
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
      path: path?.trim() || '' // Keep but consider deprecating
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

    // Handle planter details update
    if (planter_details) {
      if (planter_details.type && planter_details.size && planter_details.color) {
        const planterData = {
          type: planter_details.type,
          size: planter_details.size,
          color: planter_details.color.trim()
        };

        // Check if planter entry already exists
        const { data: existingPlanter } = await supabase
          .from('planter')
          .select('planter_id')
          .eq('product_id', product_id)
          .single();

        if (existingPlanter) {
          // Update existing planter
          const { error: planterError } = await supabase
            .from('planter')
            .update(planterData)
            .eq('product_id', product_id);

          if (planterError) {
            console.error('Update planter error:', planterError);
          }
        } else {
          // Insert new planter
          const { error: planterError } = await supabase
            .from('planter')
            .insert([{ ...planterData, product_id }]);

          if (planterError) {
            console.error('Insert planter error:', planterError);
          }
        }
      }
    }

    console.log('Product updated successfully:', data);
    
    // Return product with planter details and images
    const { data: productWithImages } = await supabase
      .from('product')
      .select(`
        *,
        planter (*),
        product_images (*)
      `)
      .eq('product_id', product_id)
      .single();

    const response = {
      ...productWithImages,
      planter_details: productWithImages.planter ? {
        type: productWithImages.planter.type,
        size: productWithImages.planter.size,
        color: productWithImages.planter.color
      } : null,
      images: productWithImages.product_images || []
    };

    delete response.planter;
    delete response.product_images;
    
    res.json(response);
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
      path, // Keep for backward compatibility
      category,
      active,
      planter_details
    } = req.body;

    console.log('Creating product with data:', req.body);

    // Validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    if (price < 0) {
      return res.status(400).json({ error: 'Price cannot be negative' });
    }

    // Prepare data
    const productData = {
      name: name.trim(),
      description: description?.trim() || '',
      price: Math.round(parseFloat(price)),
      path: path?.trim() || null, // Keep but consider making optional
      category: category || 'indoor',
      active: active !== undefined ? active : true,
      created_at: new Date().toISOString()
    };

    console.log('Processed product data:', productData);

    // Insert product
    const { data: product, error: productError } = await supabase
      .from('product')
      .insert([productData])
      .select()
      .single();

    if (productError) {
      console.error('Supabase insert error:', productError);
      return res.status(500).json({ error: productError.message });
    }

    // If this product has planter details, insert into planter table
    if (planter_details && planter_details.type && planter_details.size && planter_details.color) {
      const planterData = {
        product_id: product.product_id,
        type: planter_details.type,
        size: planter_details.size,
        color: planter_details.color.trim()
      };

      console.log('Inserting planter data:', planterData);

      const { error: planterError } = await supabase
        .from('planter')
        .insert([planterData]);

      if (planterError) {
        console.error('Planter insert error:', planterError);
      }
    }

    // Return product with empty images array (images can be added separately)
    const response = {
      ...product,
      planter_details: planter_details || null,
      images: [] // Empty images array, can be populated later
    };
    
    res.status(201).json(response);
    
  } catch (error) {
    console.error('Create product exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

/**
 * Get all products grouped by name
 */
export const getProductsGroupedByName = async (req, res) => {
  try {
    const { category, active } = req.query;
    
    console.log('Fetching grouped products with filters:', { category, active });
    
    let query = supabase.from("product").select(`
      *,
      planter (*),
      product_images (*)
    `);
    
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

    console.log('Raw products data count:', data?.length);

    // Group products by name
    const groupedProducts = {};
    data?.forEach(product => {
      const productName = product.name;
      if (!groupedProducts[productName]) {
        groupedProducts[productName] = {
          group_name: productName,
          products: []
        };
      }
      
      // Format the product with planter_details and images
      const formattedProduct = {
        ...product,
        planter_details: product.planter ? {
          type: product.planter.type,
          size: product.planter.size,
          color: product.planter.color
        } : null,
        images: product.product_images || []
      };
      
      // Remove the nested objects
      delete formattedProduct.planter;
      delete formattedProduct.product_images;
      
      groupedProducts[productName].products.push(formattedProduct);
    });

    // Convert to array and sort each group's products
    const result = Object.values(groupedProducts).map(group => ({
      ...group,
      products: group.products.sort((a, b) => a.product_id - b.product_id)
    }));

    console.log('Grouped products result count:', result.length);
    
    res.json(result);
    
  } catch (error) {
    console.error('Get products grouped exception:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

/**
 * Get products by group name
 */
export const getProductsByGroupName = async (req, res) => {
  try {
    const { groupName } = req.params;
    
    if (!groupName) {
      return res.status(400).json({ error: "Group name is required" });
    }

    const { data, error } = await supabase
      .from("product")
      .select(`
        *,
        planter (*),
        product_images (*)
      `)
      .eq("name", groupName)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get products by group error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Format products with planter_details and images
    const formattedProducts = data?.map(product => ({
      ...product,
      planter_details: product.planter ? {
        type: product.planter.type,
        size: product.planter.size,
        color: product.planter.color
      } : null,
      images: product.product_images || []
    })) || [];

    // Remove nested planter objects
    formattedProducts.forEach(product => {
      delete product.planter;
      delete product.product_images;
    });

    res.json({
      group_name: groupName,
      products: formattedProducts
    });
    
  } catch (error) {
    console.error('Get products by group exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get product images by product ID
 */
export const getProductImages = async (req, res) => {
  try {
    const { productId } = req.params;

    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Get product images error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Get product images exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Add image to product
 */
export const addProductImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const { data, error } = await supabase
      .from('product_images')
      .insert([{
        product_id: productId,
        image_url: imageUrl
      }])
      .select()
      .single();

    if (error) {
      console.error('Add product image error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Add product image exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete product image
 */
export const deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('image_id', imageId);

    if (error) {
      console.error('Delete product image error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete product image exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};