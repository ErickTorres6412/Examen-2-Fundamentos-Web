// src/components/LogoutButton/LogoutButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '', showConfirmDialog = true }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (showConfirmDialog && !showDialog) {
      setShowDialog(true);
      return;
    }

    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error durante logout:', error);
      // Aún así redirigir al login
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
      setShowDialog(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 ${className}`}
      >
        {isLoggingOut ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            <span>Cerrando sesión...</span>
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Cerrar sesión</span>
          </>
        )}
      </button>

      {/* Dialog de confirmación */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirmar cierre de sesión
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro que deseas cerrar la sesión de <strong>{user?.username || 'usuario'}</strong>?
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;