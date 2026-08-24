const express = require('express');
const { protect, authorize } = require('#middleware/user/auth.middleware.js');
const { upload, uploadImage } = require('#controllers/admin/admin.upload.controller.js');
const router = express.Router();

router.post('/', protect, authorize('admin'), upload.single('image'), uploadImage);

module.exports = router;
