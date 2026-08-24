import React from 'react';
import { FiUser, FiLock, FiMapPin, FiLogOut } from 'react-icons/fi';
import { ProfileInfoTab } from '@/pages/Profile/components/ProfileInfoTab';
import { PasswordTab } from '@/pages/Profile/components/PasswordTab';
import { AddressTab } from '@/pages/Profile/components/AddressTab';
import { useProfile } from '@/pages/Profile/components/useProfile';

const tabs = [
  { id: 'info', label: 'Profile Info', icon: FiUser },
  { id: 'password', label: 'Password', icon: FiLock },
  { id: 'addresses', label: 'Addresses', icon: FiMapPin },
];

export const Profile = () => {
  const {
    user,
    logout,
    activeTab,
    setActiveTab,
    loading,
    formData,
    passwordData,
    addresses,
    handleInputChange,
    handlePasswordChange,
    handleAddressChange,
    handleAddAddress,
    handleDeleteAddress,
    handleUpdateProfile,
    handleUpdatePassword,
    handleSaveAddresses,
    handleDeleteAccount
  } = useProfile();

  if (!user) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center mb-8 relative">
          <button onClick={logout} className="absolute right-0 top-0 flex items-center space-x-2 text-rose-500 font-bold hover:text-rose-600 transition-colors">
            <FiLogOut /> <span>Logout</span>
          </button>
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-xl font-display">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">{user?.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{user?.email}</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200 dark:border-white/10 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.id ? 'btn-gradient text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-200 dark:border-white/10 min-h-[400px]">
          {activeTab === 'info' && (
            <ProfileInfoTab 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleUpdateProfile={handleUpdateProfile} 
              loading={loading} 
            />
          )}
          {activeTab === 'password' && (
            <PasswordTab 
              passwordData={passwordData} 
              handlePasswordChange={handlePasswordChange} 
              handleUpdatePassword={handleUpdatePassword} 
              loading={loading} 
            />
          )}
          {activeTab === 'addresses' && (
            <AddressTab 
              addresses={addresses} 
              handleAddAddress={handleAddAddress} 
              handleDeleteAddress={handleDeleteAddress} 
              handleAddressChange={handleAddressChange} 
              handleSaveAddresses={handleSaveAddresses} 
              loading={loading} 
            />
          )}
        </div>

        <div className="editorial-card rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-rose-600 dark:text-rose-400">GDPR Data Privacy & Account Deletion</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Permanently erase your account, login credentials, and stored personal addresses from Lumina servers in compliance with international data privacy laws.
            </p>
          </div>
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

