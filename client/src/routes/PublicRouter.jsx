import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from '@/pages/Home/HomePage';
import { Products } from '@/pages/Products/ProductsPage';
import { ProductDetail } from '@/pages/Products/ProductDetailPage';
import { Cart } from '@/pages/Cart/CartPage';
import { Auth } from '@/pages/Auth/AuthPage';
import { Categories } from '@/pages/Categories/CategoriesPage';
import { About } from '@/pages/About/AboutPage';
import { FeaturesPage } from '@/pages/Features/FeaturesPage';
import { Checkout } from '@/pages/Checkout/CheckoutPage';
import { Orders } from '@/pages/Orders/OrdersPage';
import { Profile } from '@/pages/Profile/ProfilePage';
import { Wishlist } from '@/pages/Wishlist/WishlistPage';

import { FaqPage } from '@/pages/Support/FaqPage';
import { ShippingReturnsPage } from '@/pages/Support/ShippingReturnsPage';
import { CareGuidePage } from '@/pages/Support/CareGuidePage';
import { ContactPage } from '@/pages/Support/ContactPage';
import { PrivacyPolicyPage } from '@/pages/Legal/PrivacyPolicyPage';
import { TermsOfServicePage } from '@/pages/Legal/TermsOfServicePage';
import { RefundPolicyPage } from '@/pages/Legal/RefundPolicyPage';

export const PublicRouter = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/faq" element={<FaqPage />} />
      <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
      <Route path="/care-guide" element={<CareGuidePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />
      <Route path="/refund" element={<RefundPolicyPage />} />
    </>
  );
};
