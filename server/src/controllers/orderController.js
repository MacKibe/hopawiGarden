import supabase from "../supabaseClient.js";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

// Initialize Brevo client
const emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

// Email template functions
const generateCustomerEmailTemplate = (order, items) => {
  const itemsList = items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.product_name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Kshs ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>`
  ).join('');

  const deliveryInfo = order.delivery_method === 'delivery' 
    ? `
      <h3 style="color: #4CAF50; margin-top: 20px;">🚚 Delivery Information</h3>
      <p><strong>Address:</strong> ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}</p>
      <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
    `
    : `
      <h3 style="color: #4CAF50; margin-top: 20px;">🏪 Pickup Information</h3>
      <p><strong>Store Address:</strong> HOPAWI GARDENS, Greenfield Estate, Kamiti Rd, Nairobi.</p>
      <p><strong>Hours:</strong> Mon-Sun, 8:00 AM - 8:00 PM</p>
      <p><strong>Contact:</strong>(+254) 720 804523</p>
      <p><strong>Estimated Ready Time:</strong> 2 hours</p>
      <p>📞 We'll call you when your order is ready for pickup</p>
    `;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ##f7e1c3; padding: 20px;">
      <div style="background: #C8E6C9; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <img src=${process.env.LOGO_URL} alt="HOPAWI GARDENS logo" width="150">
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Order Confirmation</p>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4CAF50;">Thank you for your order, ${order.customer_name}!</h2>
        <p>Your order <strong>#${order.id.slice(0, 8)}</strong> has been received and is being processed.</p>
        
        <h3 style="color: #4CAF50; margin-top: 20px;">📦 Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #4CAF50;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #4CAF50;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #4CAF50;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em; color: #4CAF50; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;">
            <span><strong>Total Amount:</strong></span>
            <span><strong>Kshs ${order.total_amount.toLocaleString()}</strong></span>
          </div>
        </div>

        ${deliveryInfo}

        <h3 style="color: #4CAF50; margin-top: 20px;">💳 Payment Information</h3>
        <p><strong>Payment Method:</strong> M-Pesa Before Delivery Use this number for  payment <strong>(+254) 720 804523</strong></p>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4CAF50;">
          <p style="margin: 0;"><strong>Need help?</strong> Reply to this email or call us at (+254) 720 804523</p>
        </div>

        <p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 30px;">
          Thank you for choosing HOPAWI GARDENS! 🌱
        </p>
      </div>
    </div>
  `;
};

const generateAdminEmailTemplate = (order, items) => {
  const itemsList = items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.product_name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Kshs ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>`
  ).join('');

  const deliveryDetails = order.delivery_method === 'delivery' 
    ? `
      <p><strong>Delivery Address:</strong> ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}</p>
    `
    : `<p><strong>Pickup Method:</strong> Customer will collect from store</p>`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ##f7e1c3;">
      <div style="background: #C8E6C9; color: white; padding: 20px; text-align: center;">
        <img src=${process.env.LOGO_URL} alt="HOPAWI GARDENS logo" width="150">
        <h1 style="margin: 0;">🛎️ NEW ORDER</h1>
        <p style="margin: 5px 0 0 0;">Order #${order.id.slice(0, 8)}</p>
      </div>
      
      <div style="background: white; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #4CAF50;">New Order Received</h2>
        
        <h3 style="color: #4CAF50;">👤 Customer Information</h3>
        <p><strong>Name:</strong> ${order.customer_name}</p>
        <p><strong>Email:</strong> ${order.customer_email}</p>
        <p><strong>Delivery Method:</strong> ${order.delivery_method === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</p>
        
        ${deliveryDetails}

        <h3 style="color: #4CAF50; margin-top: 20px;">📦 Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #4CAF50;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #4CAF50;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #4CAF50;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>Order Total:</span>
            <span>Kshs ${order.total_amount.toLocaleString()}</span>
          </div>
        </div>

        <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Action Required:</strong> Process this order and ${order.delivery_method === 'delivery' ? 'schedule delivery' : 'prepare for pickup'}</p>
        </div>
      </div>
    </div>
  `;
};

// Email sending functions
const sendCustomerConfirmationEmail = async (order, items) => {
  try {
    const customerEmail = new SendSmtpEmail();
    customerEmail.subject = `HOPAWI GARDENS - Order Confirmation #${order.id.slice(0, 8)}`;
    customerEmail.sender = { 
      name: "HOPAWI Gardens", 
      email: process.env.BREVO_FROM 
    };
    customerEmail.to = [{ 
      email: order.customer_email, 
      name: order.customer_name 
    }];
    customerEmail.htmlContent = generateCustomerEmailTemplate(order, items);

    const response = await emailAPI.sendTransacEmail(customerEmail);
    console.log("✅ Customer confirmation email sent:", response.body);
    return true;
  } catch (error) {
    console.error("❌ Error sending customer email:", error.body || error);
    return false;
  }
};

const sendAdminNotificationEmail = async (order, items) => {
  try {
    const adminEmail = new SendSmtpEmail();
    adminEmail.subject = `🛎️ NEW ORDER #${order.id.slice(0, 8)} - ${order.customer_name}`;
    adminEmail.sender = { 
      name: "HOPAWI Gardens Orders", 
      email: process.env.BREVO_FROM 
    };
    adminEmail.to = [{ 
      email: process.env.BREVO_TO, 
      name: "HOPAWI Gardens Team" 
    }];
    adminEmail.htmlContent = generateAdminEmailTemplate(order, items);

    const response = await emailAPI.sendTransacEmail(adminEmail);
    console.log("✅ Admin notification email sent:", response.body);
    return true;
  } catch (error) {
    console.error("❌ Error sending admin email:", error.body || error);
    return false;
  }
};

// Main createOrder function
export const createOrder = async (req, res) => {
  try {
    const { 
      customerEmail, 
      customerName, 
      deliveryMethod, 
      shippingAddress, 
      shippingCity, 
      shippingState, 
      shippingZip, 
      pickupLocation, 
      items, 
      totalAmount 
    } = req.body;

    // Validation
    if (!customerEmail || !customerName || !deliveryMethod || !items || !totalAmount) {
      return res.status(400).json({ 
        error: "Missing required fields: customerEmail, customerName, deliveryMethod, items, totalAmount" 
      });
    }

    if (deliveryMethod === 'delivery' && (!shippingAddress || !shippingCity || !shippingState || !shippingZip)) {
      return res.status(400).json({ 
        error: "Delivery method requires: shippingAddress, shippingCity, shippingState, shippingZip" 
      });
    }

    if (deliveryMethod === 'pickup' && !pickupLocation) {
      return res.status(400).json({ 
        error: "Pickup method requires: pickupLocation" 
      });
    }

    // Create order in database (transaction)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_email: customerEmail,
        customer_name: customerName,
        delivery_method: deliveryMethod,
        shipping_address: shippingAddress,
        shipping_city: shippingCity,
        shipping_state: shippingState,
        shipping_zip: shippingZip,
        pickup_location: pickupLocation,
        total_amount: totalAmount,
        order_status: 'confirmed'
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Create order error:', orderError);
      return res.status(500).json({ error: orderError.message });
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Create order items error:', itemsError);
      // Rollback the order if items fail
      await supabase.from('orders').delete().eq('id', order.id);
      return res.status(500).json({ error: itemsError.message });
    }

    // ✅ FIX: Get the actual order items from database for emails
    const { data: savedOrderItems, error: fetchError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    let itemsForEmail;
    if (fetchError) {
      console.error('Error fetching order items:', fetchError);
      // Fallback to original items
      itemsForEmail = items;
    } else {
      // Use the actual saved order items
      itemsForEmail = savedOrderItems;
    }

    // Debug: Check what's in the items
    console.log('📧 Email items data:', itemsForEmail);
    console.log('📧 First item product_name:', itemsForEmail[0]?.product_name);

    // Send emails (don't await - send in background)
    Promise.all([
      sendCustomerConfirmationEmail(order, itemsForEmail),
      sendAdminNotificationEmail(order, itemsForEmail)
    ]).then(([customerSuccess, adminSuccess]) => {
      if (!customerSuccess) {
        console.warn("⚠️ Customer email failed to send");
      }
      if (!adminSuccess) {
        console.warn("⚠️ Admin email failed to send");
      }
    }).catch(emailError => {
      console.error("⚠️ Email sending error:", emailError);
    });

    res.status(201).json({
      success: true,
      orderId: order.id,
      message: "Order placed successfully"
    });

  } catch (error) {
    console.error('Create order exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('customer_email', email)
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