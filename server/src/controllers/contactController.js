import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required: name, email, subject, message' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: email, // The sender email
      to: 'ndichujames2030@gmail.com', // Your testing receiving email
      replyTo: `"${name}" <${email}>`, // Make it reply to the user email
      subject: `HOPAWI GARDENS inquire form: ${subject}`,
      html: `${message}`
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Contact form message sent successfully from:', email);
    
    res.status(200).json({ 
      success: true,
      message: 'Message sent successfully! We will get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later or contact us directly.' 
    });
  }
};
