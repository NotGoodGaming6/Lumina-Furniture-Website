const couponService = require('#services/coupon/coupon.service.js');

exports.validateCoupon = async (req, res, next) => {
  try {
    const coupon = await couponService.validateCoupon(req.params.code);
    res.status(200).json({
      success: true,
      data: coupon
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await couponService.getCoupons();
    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Promotion retrieval error' });
  }
};

exports.createCoupon = async (req, res, next) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json({
      success: true,
      data: coupon
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateCoupon = async (req, res, next) => {
  try {
    const coupon = await couponService.updateCoupon(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: coupon
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    await couponService.deleteCoupon(req.params.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
