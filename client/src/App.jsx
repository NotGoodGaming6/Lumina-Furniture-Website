import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/layouts/main/Navbar';
import Footer from '@/components/layouts/main/Footer';
import { CookieConsentBanner } from '@/components/shared/CookieConsentBanner';
import { WelcomeOnboardingModal } from '@/components/shared/WelcomeOnboardingModal';
import { SupportWidget } from '@/components/shared/SupportWidget';
import { CompareDrawer } from '@/components/shared/CompareDrawer';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { AppRouter } from '@/routes/AppRouter';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CompareProvider } from '@/context/CompareContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { FiInstagram, FiTwitter, FiFacebook, FiArrowRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useSocket } from '@/hooks/useSocket';
import { Toaster, toast } from 'react-hot-toast';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { socket, connected } = useSocket(userInfo?._id, userInfo?.role);

  useScrollTrigger();

  React.useEffect(() => {
    if (socket) {
      socket.on('newOrder', (data) => {
        toast.success(`New Order Received! Amount: $${data.totalPrice}`, {
          duration: 6000,
          position: 'top-right',
          icon: '📦'
        });
      });

      socket.on('orderStatusUpdated', (data) => {
        toast(`Order update: ${data.message}`, {
          duration: 6000,
          position: 'top-right',
          icon: '🚚'
        });
      });

      return () => {
        socket.off('newOrder');
        socket.off('orderStatusUpdated');
      };
    }
  }, [socket]);

  return (
    <div className={`flex flex-col min-h-screen ${isAdminRoute ? 'bg-slate-100' : 'bg-slate-50'} font-sans selection:bg-brand-500 selection:text-white noise-bg`}>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <main className={`flex-grow flex flex-col ${isAdminRoute ? 'pt-0' : 'pt-0'}`}>
        <AppRouter />
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CookieConsentBanner />}
      {!isAdminRoute && <WelcomeOnboardingModal />}
      {!isAdminRoute && <SupportWidget />}
      {!isAdminRoute && <CompareDrawer />}
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <WishlistProvider>
          <CompareProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <AppContent />
              </Router>
            </CartProvider>
          </CompareProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  );
};
