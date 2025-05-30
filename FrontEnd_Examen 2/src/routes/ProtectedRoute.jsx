// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

// Componente de loading mientras se inicializa la autenticación
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <span className="mt-3 block text-gray-600">Verificando autenticación...</span>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isInitialized, user, checkAuthStatus } = useAuth();
  const location = useLocation();

  // Debug: Agregar logs para debugging
  useEffect(() => {
    console.log('ProtectedRoute - Estado actual:', {
      isAuthenticated,
      loading,
      isInitialized,
      hasUser: !!user,
      hasToken: !!(user?.token),
      location: location.pathname
    });
  }, [isAuthenticated, loading, isInitialized, user, location.pathname]);

  // Verificar estado de autenticación cuando se monta el componente
  useEffect(() => {
    if (isInitialized && user) {
      checkAuthStatus();
    }
  }, [isInitialized, user, checkAuthStatus]);

  // Mostrar loading mientras se inicializa la autenticación
  if (!isInitialized || loading) {
    console.log('ProtectedRoute: Mostrando loading...');
    return <LoadingSpinner />;
  }

  // Si no está autenticado, redirigir al login con la ubicación actual
  if (!isAuthenticated) {
    console.log('ProtectedRoute: Usuario no autenticado, redirigiendo al login...');
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Verificación adicional del usuario
  if (!user || !user.token) {
    console.log('ProtectedRoute: Datos de usuario incompletos, redirigiendo al login...');
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Debug: Confirmar que se va a renderizar el contenido
  console.log('ProtectedRoute: Renderizando contenido protegido con Layout');

  // Si está autenticado, mostrar el contenido con el Layout
  try {
    return (
      <Layout>
        {children}
      </Layout>
    );
  } catch (error) {
    console.error('ProtectedRoute: Error al renderizar Layout:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">Error al cargar la aplicación</div>
          <p className="text-red-500">Por favor, recarga la página</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }
};

export default ProtectedRoute;