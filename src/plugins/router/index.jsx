import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import AuthGuard from '@/components/AuthGuard'; 
import Home from '@/views/auth/Home/index.jsx';
import Login from '@/views/public/Login/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Layout principal
    children: [
      {
        path: '/',
        element: <AuthGuard />, // AuthGuard envuelve TODAS las rutas hijas
        children: [
          {
            path: '', // Ruta raíz
            element: <Home />,
          },
          {
            path: 'login', // Login también pasa por AuthGuard
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;