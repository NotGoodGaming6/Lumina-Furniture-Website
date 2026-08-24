import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useGetMeQuery } from '@/redux/api/userApiSlice';
import { apiSlice } from '@/redux/api/apiSlice';
import { setCredentials, logout as reduxLogout } from '@/redux/slices/authSlice';
import { successAlert, errorAlert, cartToast } from '@/utils/alerts';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  const { data: userData, isLoading: isMeLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const [loginMutation] = useLoginMutation();

  useEffect(() => {
    if (userData?.data && token) {
      dispatch(setCredentials({ user: userData.data, token }));
    }
    if (isError || !token) {
      dispatch(reduxLogout());
    }
    if (!isMeLoading) {
      setLoading(false);
    }
  }, [userData, isError, isMeLoading, dispatch, token]);

  const setUser = (newUser) => {
    dispatch(setCredentials({ user: newUser, token }));
  };

  const login = async (email, password) => {
    try {
      const result = await loginMutation({ email, password }).unwrap();
      dispatch(setCredentials({ 
        user: result.user, 
        token: result.token,
        refreshToken: result.refreshToken
      }));
      cartToast('Successfully logged in!');
      return result.user;
    } catch (error) {
      errorAlert('Login failed', error.data?.error || 'Login failed');
      return null;
    }
  };

  const logout = () => {
    dispatch(reduxLogout());
    dispatch(apiSlice.util.resetApiState());
    cartToast('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
