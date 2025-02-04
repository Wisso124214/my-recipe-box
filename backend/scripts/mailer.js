import nodemailer from 'nodemailer'; // Import the nodemailer library for email sending functionality.
import { app } from './index.js'; // Import the app instance from the db.js file.
import { config } from '../../config/config.js'; // Import the SMTP configuration object from the config.js file.

const { SMTP } = config; // Destructure the SMTP configuration object.

// Email sending endpoint.
app.post('/send-email', async (req, res) => {
  console.log('send-email');
  try {
    const { datatransporter, mailOptions } = req.body;

    const transporter = nodemailer.createTransport(datatransporter);

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending email:', err);
        res.status(500).json({ status: 'error', message: 'Error sending email, please try again.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ status: 'success', message: 'Email sent successfully' });
      }
    });
    /*const { name, subject, email, message } = req.body; // Destructure and retrieve data from request body

    // Validate required fields.
    if (!name || !subject || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }
    
    // Prepare the email message options.
    const mailOptions = {
        from: SMTP.SENDER_EMAIL, // Sender address from environment variables.
        to: `${name} <${email}>`, // Recipient's name and email address.
        replyTo: SMTP.REPLY_TO, // Sets the email address for recipient responses.
        subject: subject, // Subject line.
        text: message // Plaintext body.
    };

    // Send email and log the response.
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ status: 'success', message: 'Email sent successfully' });
    */
  } catch (err) {
    // Handle errors and log them.
    console.error('Error sending email:', err);
    res.status(500).json({ status: 'error', message: 'Error sending email, please try again.' });
  }
});
