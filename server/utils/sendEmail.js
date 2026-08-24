const nodemailer = require('nodemailer');

const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined;
  const secure = process.env.EMAIL_SECURE === 'true';

  if (!user || !pass) {
    return null;
  }

  if (host && port) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });
  }

  if (user.toLowerCase().endsWith('@gmail.com')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  const domain = user.split('@')[1];
  if (domain) {
    return nodemailer.createTransport({
      host: `smtp.${domain}`,
      port: 465,
      secure: true,
      auth: { user, pass }
    });
  }

  return null;
};

const sendOtpEmail = async (email, otp, name) => {
  const transporter = createTransporter();

  const subject = 'Your Lumina Verification Code';
  const text = `Hello ${name},\n\nYour verification code is ${otp}.\nIt expires in 2 minutes.\n\nIf you did not request this, please ignore this email.`;
  const html = `<p>Hello <strong>${name}</strong>,</p><p>Your verification code is <strong>${otp}</strong>.</p><p>This code expires in 2 minutes.</p>`;

  if (!transporter) {
    console.warn(`EMAIL WARNING: No email transport configured. OTP for ${email}: ${otp}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@lumina.com',
      to: email,
      subject,
      text,
      html
    });
  } catch (err) {
    console.error('sendOtpEmail failed:', err);
    throw err;
  }
};

module.exports = { sendOtpEmail };
