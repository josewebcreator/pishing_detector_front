import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import AuthGuard from '@/components/AuthGuard'; 
import Home from '@/views/auth/Home/index.jsx';
import Login from '@/views/public/Login/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App es el envoltorio (layout) principal
    children: [
      {
        path: '/',
        element: <AuthGuard />, // AuthGuard es el componente protector
        children: [
          {
            path: '', // Ruta raíz: "/"
            element: <Home />, // La Home solo se carga si AuthGuard lo permite
          },
        ],
      },
      {
        path: 'login', // Ruta: "/login"
        element: <Login />, // Login es una ruta pública, pero AuthGuard aún la protege contra accesos de usuarios logueados
      },
    ],
  },
]);

export default router;