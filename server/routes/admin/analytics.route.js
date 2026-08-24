const express = require('express');
const { getAnalytics } = require('#controllers/admin/admin.analytics.controller.js');
const { protect, authorize } = require('#middleware/user/auth.middleware.js');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getAnalytics);

module.exports = router;
