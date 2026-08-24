import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheckCircle } from 'react-icons/fi';
import { useGetProductsQuery } from '@/redux/api/productApiSlice';
import { 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation,
  useUploadImageMutation 
} from '@/redux/api/adminApiSlice';
import { successAlert, errorAlert, confirmAlert } from '@/utils/alerts';

export const InventoryTab = () => {
  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery({});
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const products = productsData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Furniture',
    tag: '',
    stock: 10
  });

  const categories = ['Furniture', 'Lighting', 'Decor', 'Botanical'];

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        tag: product.tag || '',
        stock: product.stock || 0
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Furniture',
        tag: '',
        stock: 10
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, ...formData }).unwrap();
        successAlert('Success', 'Product updated successfully');
      } else {
        await createProduct(formData).unwrap();
        successAlert('Success', 'Product created successfully');
      }
      handleCloseModal();
    } catch (err) {
      errorAlert('Failed', err.data?.error || 'Operation failed');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploading(true);

    try {
      const res = await uploadImage(uploadData).unwrap();
      setFormData(prev => ({
        ...prev,
        image: res.data 
      }));
      successAlert('Uploaded', 'Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      errorAlert('Upload failed', 'Please ensure it is a valid image (max 5MB)');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    confirmAlert('Are you sure?', 'You won\'t be able to revert this!').then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id).unwrap();
          successAlert('Deleted!', 'Product has been deleted.');
        } catch (err) {
          errorAlert('Error', 'Failed to delete product');
        }
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Inventory Catalogue</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">Manage studio products, pricing, stock levels, and tags</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-gradient text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center min-h-[44px]"
        >
          <FiPlus className="mr-2 h-5 w-5" /> Add New Product
        </button>
      </div>

      {loadingProducts ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                <th className="pb-4 pl-4">Product</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Stock Status</th>
                <th className="pb-4 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm font-light">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 pl-4 flex items-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'; }}
                      className="w-12 h-12 rounded-lg object-cover mr-4 border border-slate-200 dark:border-white/10 shrink-0" 
                    />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{product.name}</div>
                      {product.tag && (
                        <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200 dark:border-white/10 mt-0.5 inline-block">
                          {product.tag}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 font-medium text-slate-600 dark:text-slate-300">{product.category}</td>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">${(product.price ?? 0).toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${(product.stock || 0) > 0 ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20'}`}>
                      {(product.stock || 0) > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => handleOpenModal(product)}
                        aria-label={`Edit ${product.name}`}
                        className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-slate-900 dark:hover:text-white p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        aria-label={`Delete ${product.name}`}
                        className="min-h-[44px] min-w-[44px] text-slate-400 hover:text-rose-500 p-2.5 rounded-xl hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">No products found in inventory.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-white/10"
            >
              <div className="px-8 py-6 border-b border-slate-200 dark:border-white/10 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={handleCloseModal} 
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Price (USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      onWheel={(e) => e.target.blur()}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Stock Count *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      onWheel={(e) => e.target.blur()}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Tag (Optional)</label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="e.g. Bestseller, New"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Image (Upload or URL) *</label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      placeholder="Image URL or upload a file"
                      className="flex-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm"
                    />
                    <label className={`cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-xs uppercase font-bold py-3 px-6 rounded-xl transition-colors border border-slate-200 dark:border-white/10 whitespace-nowrap flex items-center min-h-[44px] ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {uploading ? 'Uploading...' : 'Upload File'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={uploadFileHandler}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-4 w-full h-32 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden relative group bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'; }} 
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-sans text-sm resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gradient px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold text-white shadow-md transition-colors flex items-center min-h-[44px]"
                  >
                    {editingProduct ? 'Update Product' : 'Publish Product'} <FiCheckCircle className="ml-2 h-4 w-4" />
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
