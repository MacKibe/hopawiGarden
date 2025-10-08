import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
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
      from: process.env.EMAIL_USER, // Send from your own email
      to: 'ndichujames2030@gmail.com', // Your testing email
      replyTo: email, // So you can reply directly to the user
      subject: `Hopawi Garden Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5016; border-bottom: 2px solid #2d5016; padding-bottom: 10px;">
            New Contact Form Submission - Hopawi Garden
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #f0f7e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5016; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This message was sent from the Hopawi Garden contact form.</p>
            <p>Received at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
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