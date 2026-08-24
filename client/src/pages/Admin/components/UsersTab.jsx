import React, { useState } from 'react';
import { FiUsers, FiShield, FiUserCheck, FiSearch, FiTrash2, FiShieldOff, FiMail, FiCalendar } from 'react-icons/fi';
import { useGetAdminUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } from '@/redux/api/adminApiSlice';
import { confirmAlert, successAlert, errorAlert } from '@/utils/alerts';
import { useAuth } from '@/context/AuthContext';

export const UsersTab = () => {
  const { data: usersData, isLoading } = useGetAdminUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const { user: currentUser } = useAuth();

  const users = usersData?.data || [];

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const confirmMessage = user.role === 'admin' 
      ? `Demote ${user.name} to regular Customer?` 
      : `Promote ${user.name} to Admin console administrator?`;

    const isConfirmed = await confirmAlert(
      'Change User Role',
      confirmMessage,
      'Update Role'
    );

    if (isConfirmed) {
      try {
        await updateUserRole({ id: user._id, role: newRole }).unwrap();
        successAlert('Updated', `${user.name}'s role changed to ${newRole}`);
      } catch (err) {
        errorAlert('Error', err?.data?.error || 'Failed to update user role');
      }
    }
  };

  const handleDeleteUser = async (user) => {
    if (user._id === currentUser?._id) {
      errorAlert('Action Denied', 'You cannot delete your active admin account.');
      return;
    }

    const isConfirmed = await confirmAlert(
      'Remove User Account',
      `Are you sure you want to delete ${user.name} (${user.email})? This action cannot be undone.`,
      'Delete User'
    );

    if (isConfirmed) {
      try {
        await deleteUser(user._id).unwrap();
        successAlert('Deleted', 'User account removed successfully');
      } catch (err) {
        errorAlert('Error', err?.data?.error || 'Failed to delete user');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
      </div>
    );
  }

  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalCustomers = users.filter(u => u.role !== 'admin').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="editorial-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center space-x-4 bg-white dark:bg-slate-900 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white">
            <FiUsers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Total Users</p>
            <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">{totalUsers}</h3>
          </div>
        </div>

        <div className="editorial-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center space-x-4 bg-white dark:bg-slate-900 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Administrators</p>
            <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">{totalAdmins}</h3>
          </div>
        </div>

        <div className="editorial-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center space-x-4 bg-white dark:bg-slate-900 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <FiUserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">Customers</p>
            <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">{totalCustomers}</h3>
          </div>
        </div>
      </div>

      <div className="editorial-card rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Registered Users</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">Manage user accounts, administrator permissions, and credentials</p>
          </div>

          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Joined Date</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm font-light">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">
                    No registered users match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isAdmin = u.role === 'admin';
                  const isCurrent = u._id === currentUser?._id;
                  
                  return (
                    <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-medium text-slate-900 dark:text-white flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                          {u.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            {u.name || 'Unnamed User'}
                            {isCurrent && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center space-x-2">
                          <FiMail className="w-4 h-4 text-slate-400" />
                          <span>{u.email}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                          isAdmin 
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                        }`}>
                          {isAdmin ? <FiShield className="w-3.5 h-3.5" /> : <FiUserCheck className="w-3.5 h-3.5" />}
                          {isAdmin ? 'Admin' : 'Customer'}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                        <div className="flex items-center space-x-2">
                          <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleToggleRole(u)}
                            disabled={isCurrent}
                            aria-label={`Toggle role for ${u.name}`}
                            className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center space-x-1.5 ${
                              isCurrent 
                                ? 'opacity-40 cursor-not-allowed text-slate-400' 
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                            }`}
                            title={isAdmin ? "Revoke Admin Role" : "Grant Admin Role"}
                          >
                            {isAdmin ? <FiShieldOff className="w-4 h-4 text-rose-500" /> : <FiShield className="w-4 h-4 text-amber-500" />}
                            <span className="hidden md:inline">{isAdmin ? 'Demote' : 'Promote'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={isCurrent}
                            aria-label={`Delete user ${u.name}`}
                            className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center justify-center ${
                              isCurrent ? 'opacity-30 cursor-not-allowed' : ''
                            }`}
                            title="Delete User Account"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
