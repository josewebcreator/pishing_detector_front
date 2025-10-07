// src/views/public/Logout.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/plugins/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access_token');
    dispatch(logout());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  return null; // No necesita renderizar nada
};

export default Logout;