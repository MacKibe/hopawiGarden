import supabase from "../supabaseClient.js";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

// Initialize Brevo client
const emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

// Email template functions
const generateCustomerEmailTemplate = (order, customerInfo, deliveryMethod) => {
  const itemsList = order.items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Kshs ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>`
  ).join('');

  const deliveryInfo = deliveryMethod === 'delivery' 
    ? `
      <h3 style="color: #4CAF50; margin-top: 20px;">🚚 Delivery Information</h3>
      <p><strong>Address:</strong> ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}, ${customerInfo.country}</p>
      ${customerInfo.deliveryInstructions ? `<p><strong>Delivery Instructions:</strong> ${customerInfo.deliveryInstructions}</p>` : ''}
      <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
    `
    : `
      <h3 style="color: #4CAF50; margin-top: 20px;">🏪 Pickup Information</h3>
      <p><strong>Store Address:</strong> HOPAWI GARDENS, Garden City Mall, Nairobi</p>
      <p><strong>Hours:</strong> Mon-Sun, 8:00 AM - 8:00 PM</p>
      <p><strong>Contact:</strong> 0712 345 678</p>
      <p><strong>Estimated Ready Time:</strong> 2 hours</p>
      <p>📞 We'll call you when your order is ready for pickup</p>
    `;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">🌿 HOPAWI GARDENS</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Order Confirmation</p>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4CAF50;">Thank you for your order, ${customerInfo.firstName}!</h2>
        <p>Your order <strong>#${order.id}</strong> has been received and is being processed.</p>
        
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
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>Subtotal:</span>
            <span>Kshs ${(order.total - order.shipping_cost).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Shipping:</span>
            <span>${order.shipping_cost === 0 ? 'FREE' : `Kshs ${order.shipping_cost.toLocaleString()}`}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.2em; color: #4CAF50; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;">
            <span><strong>Total:</strong></span>
            <span><strong>Kshs ${order.total.toLocaleString()}</strong></span>
          </div>
        </div>

        ${deliveryInfo}

        <h3 style="color: #4CAF50; margin-top: 20px;">💳 Payment Information</h3>
        <p><strong>Payment Method:</strong> M-Pesa ${deliveryMethod === 'delivery' ? 'on Delivery' : 'at Pickup'}</p>
        <p>${deliveryMethod === 'delivery' 
          ? 'You will pay via M-Pesa when your plants are delivered.' 
          : 'You will pay via M-Pesa when you collect your order from our store.'
        }</p>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4CAF50;">
          <p style="margin: 0;"><strong>Need help?</strong> Reply to this email or call us at 0712 345 678</p>
        </div>

        <p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 30px;">
          Thank you for choosing HOPAWI GARDENS! 🌱
        </p>
      </div>
    </div>
  `;
};

const generateAdminEmailTemplate = (order, customerInfo, deliveryMethod) => {
  const itemsList = order.items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Kshs ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>`
  ).join('');

  const deliveryDetails = deliveryMethod === 'delivery' 
    ? `
      <p><strong>Delivery Address:</strong> ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}, ${customerInfo.country}</p>
      ${customerInfo.deliveryInstructions ? `<p><strong>Delivery Instructions:</strong> ${customerInfo.deliveryInstructions}</p>` : ''}
    `
    : `<p><strong>Pickup Method:</strong> Customer will collect from store</p>`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #ff6b35; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">🛎️ NEW ORDER - HOPAWI GARDENS</h1>
        <p style="margin: 5px 0 0 0;">Order #${order.id}</p>
      </div>
      
      <div style="background: white; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #ff6b35;">New Order Received</h2>
        
        <h3 style="color: #ff6b35;">👤 Customer Information</h3>
        <p><strong>Name:</strong> ${customerInfo.firstName} ${customerInfo.lastName}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
        <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        <p><strong>Delivery Method:</strong> ${deliveryMethod === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</p>
        
        ${deliveryDetails}

        <h3 style="color: #ff6b35; margin-top: 20px;">📦 Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ff6b35;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ff6b35;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ff6b35;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>Order Total:</span>
            <span>Kshs ${order.total.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Shipping:</span>
            <span>${order.shipping_cost === 0 ? 'FREE (Pickup)' : `Kshs ${order.shipping_cost.toLocaleString()}`}</span>
          </div>
        </div>

        <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Action Required:</strong> Process this order and ${deliveryMethod === 'delivery' ? 'schedule delivery' : 'prepare for pickup'}</p>
        </div>
      </div>
    </div>
  `;
};

// Email sending functions
const sendCustomerConfirmationEmail = async (order, customerInfo, deliveryMethod) => {
  try {
    const customerEmail = new SendSmtpEmail();
    customerEmail.subject = `HOPAWI GARDENS - Order Confirmation #${order.id}`;
    customerEmail.sender = { 
      name: "HOPAWI Gardens", 
      email: process.env.BREVO_FROM 
    };
    customerEmail.to = [{ 
      email: customerInfo.email, 
      name: `${customerInfo.firstName} ${customerInfo.lastName}` 
    }];
    customerEmail.htmlContent = generateCustomerEmailTemplate(order, customerInfo, deliveryMethod);

    const response = await emailAPI.sendTransacEmail(customerEmail);
    console.log("✅ Customer confirmation email sent:", response.body);
    return true;
  } catch (error) {
    console.error("❌ Error sending customer email:", error.body || error);
    return false;
  }
};

const sendAdminNotificationEmail = async (order, customerInfo, deliveryMethod) => {
  try {
    const adminEmail = new SendSmtpEmail();
    adminEmail.subject = `🛎️ NEW ORDER #${order.id} - ${customerInfo.firstName} ${customerInfo.lastName}`;
    adminEmail.sender = { 
      name: "HOPAWI Gardens Orders", 
      email: process.env.BREVO_FROM 
    };
    adminEmail.to = [{ 
      email: process.env.BREVO_TO, 
      name: "HOPAWI Gardens Team" 
    }];
    adminEmail.htmlContent = generateAdminEmailTemplate(order, customerInfo, deliveryMethod);

    const response = await emailAPI.sendTransacEmail(adminEmail);
    console.log("✅ Admin notification email sent:", response.body);
    return true;
  } catch (error) {
    console.error("❌ Error sending admin email:", error.body || error);
    return false;
  }
};

// Enhanced createOrder function with email support
export const createOrder = async (req, res) => {
  try {
    const { items, customerInfo, total, shippingCost, userEmail, userId, deliveryMethod } = req.body;

    // Create order in database
    const { data: order, error } = await supabase
      .from('orders')
      .insert([{
        user_id: userId,
        user_email: userEmail,
        items,
        customer_info: customerInfo,
        total,
        shipping_cost: shippingCost,
        delivery_method: deliveryMethod, // Add delivery method to database
        status: 'pending',
        paid: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Create order error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Send emails (don't await - send in background)
    Promise.all([
      sendCustomerConfirmationEmail(order, customerInfo, deliveryMethod),
      sendAdminNotificationEmail(order, customerInfo, deliveryMethod)
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

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order exception:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

// Keep your existing functions (they remain unchanged)
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