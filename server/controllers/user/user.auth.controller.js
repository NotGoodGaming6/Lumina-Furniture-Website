const jwt = require('jsonwebtoken');
const User = require('#models/user/user.model.js');
const authService = require('#services/auth/auth.service.js');

const sendCredentialResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const refreshToken = user.getRefreshToken();

  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    user
  });
};

exports.registerInit = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const result = await authService.registerInit({ name, email });

    res.status(200).json({
      success: true,
      sessionId: result.sessionId,
      message: result.message
    });
  } catch (err) {
    console.error('registerInit error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { sessionId, otp } = req.body;

    if (!sessionId || !otp) {
      return res.status(400).json({ success: false, error: 'Session ID and OTP are required' });
    }

    const result = await authService.verifyOtp({ sessionId, otp });

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (err) {
    console.error('verifyOtp error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.registerComplete = async (req, res) => {
  try {
    const { sessionId, password } = req.body;

    if (!sessionId || !password) {
      return res.status(400).json({ success: false, error: 'Session ID and password are required' });
    }

    const user = await authService.registerComplete({ sessionId, password });

    sendCredentialResponse(user, 201, res);
  } catch (err) {
    console.error('registerComplete error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'Session ID is required' });
    }

    const result = await authService.resendOtp({ sessionId });

    res.status(200).json({
      success: true,
      sessionId: result.sessionId,
      message: result.message
    });
  } catch (err) {
    console.error('resendOtp error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    const user = await authService.login({ email, password });

    sendCredentialResponse(user, 200, res);
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }
    const result = await authService.forgotPassword(email);
    res.status(200).json({ success: true, message: result.message, sessionId: result.sessionId });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, error: 'Email, OTP, and new password are required' });
    }
    const result = await authService.resetPassword({ email, otp, newPassword });
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, error: 'No refresh token provided' });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh');
    const decoded = jwt.verify(refreshToken, refreshSecret);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, error: 'User no longer exists' });
    }

    const newAccessToken = user.getSignedJwtToken();
    const newRefreshToken = user.getRefreshToken();

    res.status(200).json({
      success: true,
      token: newAccessToken,
      refreshToken: newRefreshToken,
      user
    });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired refresh token' });
  }
};
