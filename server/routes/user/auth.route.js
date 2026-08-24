const express = require('express');
const { registerInit, verifyOtp, registerComplete, resendOtp, loginUser, getMe, forgotPassword, resetPassword, refreshToken } = require('#controllers/user/user.auth.controller.js');
const { protect } = require('#middleware/user/auth.middleware.js');

const router = express.Router();

router.post('/register/init', registerInit);
router.post('/register/verify-otp', verifyOtp);
router.post('/register/complete', registerComplete);
router.post('/register/resend-otp', resendOtp);

router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
