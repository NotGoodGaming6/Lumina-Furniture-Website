const express = require('express');
const { getCoupons, createCoupon, updateCoupon, deleteCoupon } = require('#controllers/admin/admin.coupon.controller.js');
const { protect, authorize } = require('#middleware/user/auth.middleware.js');
const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;
