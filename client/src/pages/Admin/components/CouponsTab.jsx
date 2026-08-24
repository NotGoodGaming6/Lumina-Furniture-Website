import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiTag } from 'react-icons/fi';
import { 
  useGetCouponsQuery, 
  useCreateCouponMutation, 
  useUpdateCouponMutation, 
  useDeleteCouponMutation 
} from '@/redux/api/adminApiSlice';
import { successAlert, errorAlert, confirmAlert } from '@/utils/alerts';

export const CouponsTab = () => {
  const { data: couponsData, isLoading: loadingCoupons } = useGetCouponsQuery();
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const coupons = couponsData?.data || [];

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [couponFormData, setCouponFormData] = useState({
    code: '',
    discountPercentage: '',
    expireAt: '',
    isActive: true
  });

  const handleCouponOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setCouponFormData({
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        expireAt: new Date(coupon.expireAt).toISOString().split('T')[0],
        isActive: coupon.isActive
      });
    } else {
      setEditingCoupon(null);
      setCouponFormData({
        code: '',
        discountPercentage: '',
        expireAt: '',
        isActive: true
      });
    }
    setIsCouponModalOpen(true);
  };

  const handleCouponCloseModal = () => {
    setIsCouponModalOpen(false);
    setEditingCoupon(null);
  };

  const handleCouponChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setCouponFormData({ ...couponFormData, [e.target.name]: value });
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await updateCoupon({ id: editingCoupon._id, ...couponFormData }).unwrap();
        successAlert('Success', 'Coupon updated successfully');
      } else {
        await createCoupon(couponFormData).unwrap();
        successAlert('Success', 'Coupon created successfully');
      }
      handleCouponCloseModal();
    } catch (err) {
      errorAlert('Failed', err.data?.error || 'Operation failed');
    }
  };

  const handleDeleteCoupon = async (id) => {
    confirmAlert('Are you sure?', 'Delete this promo code?').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCoupon(id).unwrap();
          successAlert('Deleted!', 'Coupon has been deleted.');
        } catch (err) {
          errorAlert('Failed', 'Could not delete coupon');
        }
      }
    });
  };

  if (loadingCoupons) {
    return (
      <div className="flex justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Promotional Codes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">Manage store discount coupons and active campaign expiration dates</p>
        </div>
        <button
          onClick={() => handleCouponOpenModal()}
          className="btn-gradient text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center min-h-[44px]"
        >
          <FiPlus className="mr-2 h-5 w-5" /> Add New Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        {coupons.length === 0 ? (
          <div className="text-center py-16">
            <FiTag className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No coupons available.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                <th className="pb-4 pl-4">Code</th>
                <th className="pb-4">Discount</th>
                <th className="pb-4">Expiry Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm font-light">
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 pl-4 font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {coupon.code}
                  </td>
                  <td className="py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    <span className="bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                      {coupon.discountPercentage}% OFF
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {new Date(coupon.expireAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${coupon.isActive ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20'}`}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <div className="flex items-center justify-end space-x-1">
                      <button 
                        onClick={() => handleCouponOpenModal(coupon)} 
                        aria-label={`Edit coupon ${coupon.code}`}
                        className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-slate-900 dark:hover:text-white p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Coupon"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCoupon(coupon._id)} 
                        aria-label={`Delete coupon ${coupon.code}`}
                        className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-rose-500 p-2.5 rounded-xl hover:bg-rose-500/10 transition-colors"
                        title="Delete Coupon"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {isCouponModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-white/10"
            >
              <div className="px-8 py-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
                </h2>
                <button 
                  onClick={handleCouponCloseModal} 
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 shadow-sm p-2 rounded-xl transition-colors border border-slate-200 dark:border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCouponSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Promo Code *</label>
                  <input
                    type="text"
                    name="code"
                    value={couponFormData.code}
                    onChange={handleCouponChange}
                    required
                    placeholder="e.g. SUMMER25"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white uppercase font-mono tracking-wider font-bold text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Discount Percentage (%) *</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={couponFormData.discountPercentage}
                    onChange={handleCouponChange}
                    onWheel={(e) => e.target.blur()}
                    required min="1" max="100"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white font-mono font-bold text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Expiry Date *</label>
                  <input
                    type="date"
                    name="expireAt"
                    value={couponFormData.expireAt}
                    onChange={handleCouponChange}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white font-sans text-sm"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={couponFormData.isActive}
                    onChange={handleCouponChange}
                    className="w-5 h-5 text-slate-900 focus:ring-slate-900 border-gray-300 rounded cursor-pointer min-h-[20px] min-w-[20px]"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer select-none">
                    Activate this coupon immediately
                  </label>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="btn-gradient w-full py-4 rounded-xl font-mono text-xs uppercase font-bold tracking-wider text-white transition-all shadow-md min-h-[44px]">
                    {editingCoupon ? 'Update Promo Code' : 'Save Promo Code'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
