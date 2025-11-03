import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await resend.emails.send({
      from: 'HOPAWI Gardens <no-reply@hopawigardens.com>',
      to: 'ndichujames2030@gmail.com',
      subject: `HOPAWI GARDENS Inquiry: ${subject}`,
      html: `
        <h3>Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ error: 'Failed to send message. Try again later.' });
  }
};
