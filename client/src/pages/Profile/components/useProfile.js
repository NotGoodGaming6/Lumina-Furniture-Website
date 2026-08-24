import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery, useUpdateProfileMutation, useUpdatePasswordMutation, useUpdateAddressesMutation, useDeleteAccountMutation } from '@/redux/api/userApiSlice';
import { successAlert, errorAlert, confirmAlert } from '@/utils/alerts';

export const useProfile = () => {
  const { user, setUser, logout, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [addresses, setAddresses] = useState([]);

  const { data: meData, refetch } = useGetMeQuery(undefined, { skip: !token });

  const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: updatingPassword }] = useUpdatePasswordMutation();
  const [updateAddresses, { isLoading: updatingAddresses }] = useUpdateAddressesMutation();
  const [deleteAccountMutation, { isLoading: deletingAccount }] = useDeleteAccountMutation();

  const loading = updatingProfile || updatingPassword || updatingAddresses || deletingAccount;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({ name: user.name || '', email: user.email || '' });

    if (meData?.data) {
       setAddresses(meData.data.addresses || []);
    }
  }, [user, navigate, meData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { label: '', street: '', city: '', zip: '', country: '', isDefault: false }]);
  };

  const handleDeleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(formData).unwrap();
      if (setUser) setUser(res.data);
      successAlert('Profile Updated', 'Your profile has been saved successfully.');
    } catch (err) {
      errorAlert('Update Failed', err.data?.error || 'Something went wrong');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(passwordData).unwrap();
      successAlert('Password Updated', 'Your password has been updated.');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      errorAlert('Update Failed', err.data?.error || 'Something went wrong');
    }
  };

  const handleSaveAddresses = async () => {
    try {
      await updateAddresses({ addresses }).unwrap();
      successAlert('Addresses Saved', 'Your address book has been updated.');
      refetch();
    } catch (err) {
      errorAlert('Save Failed', 'Could not save addresses');
    }
  };

  const handleDeleteAccount = async () => {
    const result = await confirmAlert(
      'Permanently Delete Account?',
      'All your profile data, addresses, and account records will be permanently removed. This action cannot be undone under GDPR regulations.',
      'Yes, Delete Everything'
    );

    if (result.isConfirmed) {
      try {
        await deleteAccountMutation().unwrap();
        successAlert('Account Deleted', 'Your account and data have been completely erased.');
        logout();
        navigate('/');
      } catch (err) {
        errorAlert('Deletion Failed', err.data?.error || 'Could not delete account at this time.');
      }
    }
  };

  return {
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
  };
};
