import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box, Typography } from '@mui/material';
import { login, logout } from '@/plugins/redux/slices/authSlice';

const AuthGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
        if (token) {
            dispatch(login());
        } else {
            dispatch(logout());
        }
        setIsAuthChecked(true);
    }, [dispatch]);

    useEffect(() => {
        if (!isAuthChecked) return;

        const currentPath = location.pathname;
        const isLoginPage = currentPath === '/login';

        if (!isLoggedIn && !isLoginPage) {
            navigate('/login', { replace: true });
        }

        if (isLoggedIn && isLoginPage) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate, location.pathname, isAuthChecked]);

    if (!isAuthChecked) {
        return (
            <Box className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
                <CircularProgress color="primary" size={60} />
                <Typography variant="h6" className="mt-4 text-gray-600">
                    Cargando sesión...
                </Typography>
            </Box>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
            <main className="flex-grow p-8">
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AuthGuard;