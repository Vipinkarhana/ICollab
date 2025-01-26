const nodemailer = require('nodemailer');
const config = require('../../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_ID, // Your personal email
    pass: config.EMAIL_PASSWORD, // App password for Gmail
  },
});

async function sendVerificationEmail(user, token) {
  const mailOptions = {
    from: config.EMAIL_ID,
    to: user.email,
    subject: 'ICollab - Verification Mail',
    html: `
        <h1>Hi ${user.name},</h1>
        <br>
        <h3>Click the link below to verify your email address:</h3>
        <br>
        <a href="http://localhost:5000/auth/verifyemail?token=${token}">Verify Email</a>
        <br>
        <h3>The confirmation link will expire in 1 Hour.</h3>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', user.email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendVerificationEmail };
