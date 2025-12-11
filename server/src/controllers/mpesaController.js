import axios from "axios";
import { Buffer } from "buffer";
import dotenv from "dotenv";
import supabase from "../supabaseClient.js";
import { sendCustomerConfirmationEmail, sendAdminNotificationEmail } from "./orderController.js";

dotenv.config();

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  PASSKEY,
  SHORT_CODE,
  MPESA_BASE_URL = "https://sandbox.safaricom.co.ke", // change to live later
  CALLBACK_URL, // Must be public! Use ngrok or Railway/Vercel
} = process.env;

// Shared: Get OAuth Token
const getAccessToken = async () => {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const { data } = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return data.access_token;
};

// 1. Initiate STK Push
export const initiateStkPush = async (req, res) => {
  try {
    const { phoneNumber, amount, orderData } = req.body;

    if (!phoneNumber || !amount || !orderData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
    const password = Buffer.from(`${SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

    const stkPayload = {
      BusinessShortCode: SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: SHORT_CODE,
      PhoneNumber: phoneNumber,
      CallBackURL: CALLBACK_URL,
      AccountReference: "HOPAWI GARDENS" + Date.now(),
      TransactionDesc: "Payment for plants",
    };

    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      stkPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Save pending order in session-like table (optional but recommended)
    const { error } = await supabase.from("pending_mpesa_orders").insert({
      checkout_request_id: response.data.CheckoutRequestID,
      phone: phoneNumber,
      amount,
      order_data: orderData,
      status: "pending",
    });

    if (error) console.error("Failed to save pending order:", error);

    res.json({
      success: true,
      CheckoutRequestID: response.data.CheckoutRequestID,
      message: "STK Push sent! Check your phone.",
    });
  } catch (err) {
    console.error("STK Push Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

export const handleMpesaCallback = async (req, res) => {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;
    const { CheckoutRequestID, ResultCode, CallbackMetadata } = stkCallback;

    console.log("M-Pesa Callback:", JSON.stringify(req.body, null, 2));

    // Find pending order
    const { data: pending } = await supabase
      .from("pending_mpesa_orders")
      .select("*")
      .eq("checkout_request_id", CheckoutRequestID)
      .single();

    if (!pending || pending.status !== "pending") {
      return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (ResultCode === 0) {
      // Payment SUCCESS
      const metadata = CallbackMetadata.Item;
      const mpesaRef = metadata.find((i) => i.Name === "MpesaReceiptNumber")?.Value;

      const orderData = pending.order_data;

      // NOW create the real order (same logic as your createOrder)
      const { data: order } = await supabase
        .from("orders")
        .insert({
          customer_email: orderData.customerEmail,
          customer_name: orderData.customerName,
          delivery_method: orderData.deliveryMethod,
          shipping_address: orderData.shippingAddress,
          shipping_city: orderData.shippingCity,
          shipping_state: orderData.shippingState || "Nairobi",
          shipping_zip: orderData.shippingZip,
          pickup_location: orderData.pickupLocation,
          total_amount: orderData.totalAmount,
          order_status: "paid",
          payment_method: "mpesa",
          mpesa_receipt_number: mpesaRef,
        })
        .select()
        .single();

      // Insert order items
      const orderItems = orderData.items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName,
        quantity: item.quantity,
        price: item.price,
      }));

      await supabase.from("order_items").insert(orderItems);

      // Send emails
      const { data: savedItems } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);

      await Promise.all([
        sendCustomerConfirmationEmail(order, savedItems || orderItems),
        sendAdminNotificationEmail(order, savedItems || orderItems),
      ]);

      // Update pending status
      await supabase
        .from("pending_mpesa_orders")
        .update({ status: "completed" })
        .eq("checkout_request_id", CheckoutRequestID);
    } else {
      // Payment failed
      await supabase
        .from("pending_mpesa_orders")
        .update({ status: "failed" })
        .eq("checkout_request_id", CheckoutRequestID);
    }

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Callback Error:", err);
    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
};