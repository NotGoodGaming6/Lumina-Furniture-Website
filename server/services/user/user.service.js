const User = require('#models/user/user.model.js');

class UserService {
  async getCart(userId) {
    const user = await User.findById(userId).populate('cart.product');
    return user.cart;
  }

  async syncCart(userId, cartItems) {
    const user = await User.findById(userId);
    user.cart = cartItems || [];
    await user.save({ validateBeforeSave: false });
    return user.cart;
  }

  async clearCart(userId) {
    const user = await User.findById(userId);
    user.cart = [];
    await user.save({ validateBeforeSave: false });
    return [];
  }

  async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return user;
  }

  async updateAddresses(userId, addresses) {
    const user = await User.findByIdAndUpdate(
      userId,
      { addresses },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getWishlist(userId) {
    const user = await User.findById(userId).populate('wishlist');
    return user.wishlist;
  }

  async addToWishlist(userId, productId) {
    const user = await User.findById(userId);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save({ validateBeforeSave: false });
    }

    return user.wishlist;
  }

  async removeFromWishlist(userId, productId) {
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save({ validateBeforeSave: false });
    return user.wishlist;
  }

  async deleteAccount(userId) {
    const Review = require('#models/misc/review.model.js');
    const Otp = require('#models/user/otp.model.js');

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 1. Delete all user reviews and update affected product ratings
    const userReviews = await Review.find({ user: userId });
    for (const review of userReviews) {
      const productId = review.product;
      await Review.findByIdAndDelete(review._id);
      await Review.calcAverageRating(productId);
    }

    // 2. Clean any OTP tokens/sessions
    await Otp.deleteMany({ email: user.email });

    // 3. Delete user document (which automatically deletes cart, addresses, wishlist)
    await User.findByIdAndDelete(userId);

    return { success: true, message: 'Account and all associated personal data permanently removed.' };
  }
}

module.exports = new UserService();