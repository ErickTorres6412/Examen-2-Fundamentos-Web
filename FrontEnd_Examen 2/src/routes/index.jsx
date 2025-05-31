// src/routes/index.jsx
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Importa los componentes de páginas
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';
import Departamentos from '../pages/Departamentos/Departamentos';
import Personas from '../pages/Person/Personas';

// Componente para manejar la redirección de la raíz
const RootRedirect = () => {
  const { isAuthenticated, loading, isInitialized } = useAuth();

  // Mostrar loading mientras se inicializa
  if (!isInitialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <span className="mt-3 block text-gray-600">Cargando...</span>
        </div>
      </div>
    );
  }

  // Redirigir según el estado de autenticación
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

// Componente para proteger la ruta de login (evitar acceso si ya está autenticado)
const LoginRoute = () => {
  const { isAuthenticated, loading, isInitialized } = useAuth();

  // Mostrar loading mientras se inicializa
  if (!isInitialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <span className="mt-3 block text-gray-600">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no está autenticado, mostrar login
  return <Login />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Ruta raíz con redirección inteligente */}
      <Route path="/" element={<RootRedirect />} />

      {/* Login con protección contra acceso autenticado */}
      <Route path="/login" element={<LoginRoute />} />

      {/* Rutas protegidas - CORREGIDO */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/departamentos" 
        element={
          <ProtectedRoute>
            <Departamentos />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/personas" 
        element={
          <ProtectedRoute>
            <Personas />
          </ProtectedRoute>
        } 
      />

      {/* Ruta para manejar 404 - redirige según autenticación */}
      <Route path="*" element={<RootRedirect />} />
    </>
  )
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;