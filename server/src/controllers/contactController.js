import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "All fields are required: name, email, subject, message",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Initialize Brevo client
    const emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

    // Build email
    const brevoMessage = new SendSmtpEmail();
    brevoMessage.subject = `HOPAWI GARDENS Inquiry: ${subject}`;
    brevoMessage.sender = { name: "HOPAWI Gardens", email: process.env.BREVO_FROM }; // Sender email
    brevoMessage.to = [{ email: process.env.BREVO_TO, name: "HOPAWI Gardens Team" }]; // Recipient email
    brevoMessage.replyTo = { email, name }; // Reply to the sender's email from the contact form
    brevoMessage.htmlContent = `
      <div style="font-family:Arial, sans-serif; line-height:1.6;">
        <h2>New Inquiry from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message}</p>
      </div>
    `;

    // Send message
    const response = await emailAPI.sendTransacEmail(brevoMessage);
    console.log("✅ Email sent:", response.body);

    res.status(200).json({
      success: true,
      message: "Message sent successfully! We’ll get back to you soon.",
    });

  } catch (error) {
    console.error("❌ Error sending email:", error.body || error);
    res.status(500).json({
      error: "Failed to send message. Please try again later or contact us directly.",
    });
  }
};
