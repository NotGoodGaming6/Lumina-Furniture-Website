const Coupon = require('#models/admin/coupon.model.js');

class CouponService {
  async validateCoupon(code) {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      throw new Error('Invalid promo code');
    }

    if (!coupon.isActive) {
      throw new Error('Promo code inactive');
    }

    if (new Date(coupon.expireAt) < new Date()) {
      throw new Error('Promo code expired');
    }

    return {
      code: coupon.code,
      discountPercentage: coupon.discountPercentage
    };
  }

  async getCoupons() {
    const coupons = await Coupon.find().sort('-createdAt');
    return coupons;
  }

  async createCoupon(couponData) {
    try {
      const coupon = await Coupon.create(couponData);
      return coupon;
    } catch (err) {
      if (err.code === 11000) {
        throw new Error('Promotion code conflict');
      }
      throw err;
    }
  }

  async updateCoupon(couponId, updateData) {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      throw new Error('Promotion not found');
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateData, {
      new: true,
      runValidators: true
    });

    return updatedCoupon;
  }

  async deleteCoupon(couponId) {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      throw new Error('Promotion not found');
    }

    await coupon.deleteOne();
    return coupon;
  }
}

module.exports = new CouponService();