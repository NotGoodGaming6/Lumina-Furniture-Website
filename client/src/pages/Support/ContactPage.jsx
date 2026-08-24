import React, { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for reaching out. Our studio team will respond within 24 hours.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#fcfbf9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 block mb-3">
            COPENHAGEN & STOCKHOLM ATELIER
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-slate-900 dark:text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-light">
            Have a question regarding custom orders, trade partnerships, or delivery assistance? Our studio team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="editorial-card rounded-2xl p-8 border border-slate-200 dark:border-white/10 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                  <FiMapPin className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Studio Address</h4>
                  <p className="text-lg font-serif font-bold text-slate-900 dark:text-white mt-1">
                    Store Kongensgade 42, 1264 Copenhagen, Denmark
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                  <FiMail className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Direct Email</h4>
                  <p className="text-lg font-serif font-bold text-slate-900 dark:text-white mt-1">
                    studio@lumina.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                  <FiPhone className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Studio Concierge</h4>
                  <p className="text-lg font-serif font-bold text-slate-900 dark:text-white mt-1">
                    +45 33 12 80 00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="editorial-card rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-white/10 space-y-6">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                  Your Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Astrid Lindgren"
                  className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none text-sm font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="astrid@studio.com"
                  className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none text-sm font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">
                  Inquiry Details *
                </label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our Copenhagen design studio assist you today?"
                  className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 outline-none text-sm font-sans resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-all shadow-lg"
              >
                Send Message <FiSend className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
