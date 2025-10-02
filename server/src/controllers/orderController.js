import supabase from "../supabaseClient.js";

export const createOrder = async (req, res) => {
  try {
    const { items, customerInfo, total, shippingCost, userEmail, userId } = req.body;

    const { data: order, error } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        user_email: userEmail,
        items,
        customer_info: customerInfo,
        total,
        shipping_cost: shippingCost,
        status: 'pending',
        paid: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Create order error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get orders error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(orders || []);
  } catch (error) {
    console.error('Get orders exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paid } = req.body;

    const updateData = {
      status,
      updated_at: new Date().toISOString()
    };

    // If marking as paid, update stock
    if (paid) {
      updateData.paid = true;
      
      // Get order items to update stock
      const { data: order } = await supabase
        .from('orders')
        .select('items')
        .eq('id', id)
        .single();

      if (order) {
        // Update product stock for each item
        for (const item of order.items) {
          await supabase
            .from('product')
            .update({ 
              stock: supabase.raw(`stock - ${item.quantity}`),
              updated_at: new Date().toISOString()
            })
            .eq('id', item.id);
        }
      }
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update order error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Update order exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};