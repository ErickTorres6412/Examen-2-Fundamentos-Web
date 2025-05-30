import React, { useState, useEffect, useRef } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const menuRef = useRef(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  // No renderizar si no hay usuario autenticado
  if (!isAuthenticated || !user) {
    return null;
  }

  // Formatear el nombre para mostrar
  const displayName = user.username || 'Usuario';
  
  // Determinar el rol principal (tomar el primero si hay múltiples)
  const primaryRole = user.roles && user.roles.length > 0 
    ? user.roles[0] 
    : 'Usuario';
  
  // Generar un email de ejemplo basado en el username
  const displayEmail = `${user.username?.toLowerCase()}@condominio.com` || 'usuario@condominio.com';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 py-1 px-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
        aria-label="Menú de usuario"
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
          <User size={16} />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium truncate max-w-[100px] text-blue-700">
            {displayName}
          </p>
          <p className="text-xs truncate max-w-[100px] text-blue-500">
            {primaryRole}
          </p>
        </div>
        <ChevronDown 
          size={14} 
          className={`hidden md:block transition-transform duration-200 text-blue-600 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
            {user.roles && user.roles.length > 0 && (
              <div className="mt-1">
                {user.roles.map((role, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mt-1"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="py-1">
            <button 
              onClick={() => {
                setIsOpen(false);
                // Aquí puedes agregar navegación al perfil cuando implementes la ruta
                console.log('Navegar a perfil');
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            >
              <User size={16} />
              <span>Mi perfil</span>
            </button>
          </div>
          
          <div className="py-1 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
            >
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;