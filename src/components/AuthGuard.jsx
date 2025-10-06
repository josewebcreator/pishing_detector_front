import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '@/plugins/redux/slices/authSlice'; 

const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;
    const isLoginPage = currentPath.includes('/login');

    if (!isLoggedIn) {
      if (!isLoginPage) {
        navigate('/login', { replace: true });
      }
    } else {
      if (isLoginPage) {
        navigate('/', { replace: true });
      }
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const handleLogin = () => dispatch(login());
  const handleLogout = () => dispatch(logout());

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-indigo-700 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Mi Aplicación (Redux Auth Guard)</h1>
        <div className="flex space-x-4 mt-2 items-center">
            <div className="text-sm font-medium">
                Estado: {isLoggedIn ? '✅ Autenticado' : '❌ No Autenticado'}
            </div>
            
            {isLoggedIn ? (
                <button 
                    onClick={handleLogout} 
                    className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
                >
                    Cerrar Sesión
                </button>
            ) : (
                <button 
                    onClick={handleLogin} 
                    className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
                >
                    Inicio de Sesión
                </button>
            )}
            <button 
                onClick={() => navigate('/')}
                className="px-3 py-1 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md"
            >
                Ir a Home ( / )
            </button>
        </div>
      </header>
      
      <main className="flex-grow p-8 bg-gray-100">
        <Outlet />
      </main>
      
    </div>
  );
};

export default AuthGuard;