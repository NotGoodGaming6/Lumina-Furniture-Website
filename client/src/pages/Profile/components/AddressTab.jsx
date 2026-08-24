import React from 'react';
import { FiMapPin, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';

export const AddressTab = ({ addresses, handleAddAddress, handleDeleteAddress, handleAddressChange, handleSaveAddresses, loading }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr, index) => (
          <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 relative group hover:border-brand-500 transition-all">
            <button
              onClick={() => handleDeleteAddress(index)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
            <div className="space-y-3">
              <input
                type="text"
                value={addr.label}
                onChange={e => handleAddressChange(index, 'label', e.target.value)}
                className="w-full font-bold text-slate-900 bg-transparent border-b border-transparent focus:border-brand-500 focus:outline-none placeholder:text-slate-400"
                placeholder="Label (e.g. Home, Office)"
              />
              <input
                type="text"
                value={addr.street}
                onChange={e => handleAddressChange(index, 'street', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="Street Address"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={addr.city}
                  onChange={e => handleAddressChange(index, 'city', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={addr.zip}
                  onChange={e => handleAddressChange(index, 'zip', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="ZIP Code"
                />
              </div>
              <input
                type="text"
                value={addr.country}
                onChange={e => handleAddressChange(index, 'country', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="Country"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddAddress}
          className="p-8 bg-white border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:text-brand-600 hover:border-brand-200 transition-all flex flex-col items-center justify-center space-y-4 group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-50 transition-colors">
            <FiPlus className="h-6 w-6" />
          </div>
          <span className="font-bold">Add New Address</span>
        </button>
      </div>

      {addresses.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveAddresses}
            disabled={loading}
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
          >
            <FiSave className="h-5 w-5" />
            <span>{loading ? 'Saving...' : 'Save Addresses'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
