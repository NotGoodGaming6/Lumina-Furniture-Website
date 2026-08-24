import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thank you for subscribing to the Lumina Journal.");
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-800 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-serif font-bold tracking-tight text-white block">
                LUMINA<span className="text-amber-500 font-serif">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-light text-slate-400">
              Elevating modern living spaces with premium Scandinavian furniture, architectural lighting, and curated home objects.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Lumina on Instagram"
                className="w-11 h-11 rounded-full bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Lumina on Twitter"
                className="w-11 h-11 rounded-full bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit Lumina on Facebook"
                className="w-11 h-11 rounded-full bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6 tracking-wide">Shop</h4>
            <ul className="space-y-3.5 text-sm font-light">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Furniture" className="hover:text-white transition-colors">Furniture</Link></li>
              <li><Link to="/products?category=Lighting" className="hover:text-white transition-colors">Lighting</Link></li>
              <li><Link to="/products?category=Decor" className="hover:text-white transition-colors">Decoration</Link></li>
              <li><Link to="/products?tag=New" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6 tracking-wide">Support</h4>
            <ul className="space-y-3.5 text-sm font-light">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/care-guide" className="hover:text-white transition-colors">Care Guide</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6 tracking-wide">Stay in the Loop</h4>
            <p className="text-sm mb-4 font-light text-slate-400">Subscribe to receive studio updates, design guides, and exclusive collection previews.</p>
            <form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/80 dark:bg-slate-900 border border-slate-700 dark:border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
                />
              </div>
              <button 
                type="submit" 
                aria-label="Subscribe to newsletter"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-mono text-xs uppercase tracking-widest font-bold rounded-xl py-3.5 px-4 transition-colors flex items-center justify-center group shadow-lg min-h-[44px]"
              >
                Subscribe
                <FiArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono tracking-wider text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} LUMINA. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 md:mt-0 uppercase">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
