const express = require('express');
const { updateProfile, updatePassword, manageAddresses, deleteAccount } = require('#controllers/user/user.profile.controller.js');
const { protect } = require('#middleware/user/auth.middleware.js');

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.put('/addresses', protect, manageAddresses);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
