const express = require('express');
const { validateCoupon } = require('#controllers/admin/admin.coupon.controller.js');
const router = express.Router();

router.get('/:code', validateCoupon);

module.exports = router;
