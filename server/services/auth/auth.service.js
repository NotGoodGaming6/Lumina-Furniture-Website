const User = require('#models/user/user.model.js');
const Otp = require('#models/user/otp.model.js');
const { sendOtpEmail } = require('#utils/sendEmail.js');
const crypto = require('crypto');

const OTP_EXPIRY_MINUTES = 2;

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

class AuthService {
  async registerInit({ name, email }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('This email is already registered');
    }

    await Otp.deleteMany({ email });

    const otpCode = generateOtp();
    const otpSession = await Otp.create({
      email,
      name,
      otp: otpCode,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
    });

    await sendOtpEmail(email, otpCode, name);

    return {
      sessionId: otpSession._id,
      message: 'Verification code sent to your email'
    };
  }

  async verifyOtp({ sessionId, otp }) {
    const otpSession = await Otp.findById(sessionId);

    if (!otpSession) {
      throw new Error('Session expired or invalid. Please request a new code.');
    }

    if (new Date() > otpSession.expiresAt) {
      await Otp.findByIdAndDelete(sessionId);
      throw new Error('Code has expired. Please request a new one.');
    }

    const isMatch = await otpSession.matchOtp(otp);
    if (!isMatch) {
      throw new Error('Invalid verification code');
    }

    otpSession.isVerified = true;
    await otpSession.save();

    return { message: 'Email verified successfully' };
  }

  async registerComplete({ sessionId, password }) {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const otpSession = await Otp.findById(sessionId);

    if (!otpSession) {
      throw new Error('Session expired. Please start registration again.');
    }

    if (!otpSession.isVerified) {
      throw new Error('Email not verified. Please verify your OTP first.');
    }

    const existingUser = await User.findOne({ email: otpSession.email });
    if (existingUser) {
      await Otp.findByIdAndDelete(sessionId);
      throw new Error('This email is already registered');
    }

    const user = await User.create({
      name: otpSession.name,
      email: otpSession.email,
      password
    });

    await Otp.findByIdAndDelete(sessionId);

    return user;
  }

  async resendOtp({ sessionId }) {
    const otpSession = await Otp.findById(sessionId);

    if (!otpSession) {
      throw new Error('Session expired. Please start registration again.');
    }

    const { email, name } = otpSession;
    await Otp.findByIdAndDelete(sessionId);

    const otpCode = generateOtp();
    const newSession = await Otp.create({
      email,
      name,
      otp: otpCode,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
    });

    await sendOtpEmail(email, otpCode, name);

    return {
      sessionId: newSession._id,
      message: 'New verification code sent'
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Authentication failed');
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new Error('Authentication failed');
    }

    return user;
  }

  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No user account found with this email');
    }

    await Otp.deleteMany({ email });

    const otpCode = generateOtp();
    const otpSession = await Otp.create({
      email,
      name: user.name,
      otp: otpCode,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
    });

    await sendOtpEmail(email, otpCode, user.name);

    return {
      sessionId: otpSession._id,
      message: 'Password reset verification code sent to your email'
    };
  }

  async resetPassword({ email, otp, newPassword }) {
    const otpSession = await Otp.findOne({ email, otp });

    if (!otpSession) {
      throw new Error('Invalid or expired OTP code');
    }

    if (new Date() > otpSession.expiresAt) {
      await Otp.findByIdAndDelete(otpSession._id);
      throw new Error('OTP code has expired. Please request a new one.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User account not found');
    }

    user.password = newPassword;
    await user.save();

    await Otp.deleteMany({ email });

    return { message: 'Password updated successfully. You can now log in.' };
  }
}

module.exports = new AuthService();