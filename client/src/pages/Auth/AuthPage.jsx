import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthShell } from './components/AuthShell';

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const toggleAuth = () => {
    const nextPath = isLogin ? '/register' : '/login';
    navigate(nextPath, { replace: true });
  };

  return <AuthShell isLogin={isLogin} toggleAuth={toggleAuth} />;
};
