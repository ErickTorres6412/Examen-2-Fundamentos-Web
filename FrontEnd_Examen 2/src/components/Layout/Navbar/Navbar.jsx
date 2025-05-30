import React from 'react';
import { X, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import UserMenu from '../../User/UserMenu';
import '../../../styles/theme.css';

const Navbar = ({
  toggleSidebar,
  isSidebarOpen,
  toggleSidebarCompact,
  isSidebarCompact
}) => {
  return (
    <nav className="fixed w-full z-30 top-0 shadow-sm" style={{ background: 'white' }}>
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Botón de menú y logo */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg lg:hidden hover:bg-gray-100 transition-colors"
              style={{ color: 'var(--color-text-dark)' }}
              aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
           
            <div className="flex items-center ml-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)" />
                <path d="M2 17L12 22L22 17" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-lg font-semibold ml-2" style={{ color: 'var(--color-primary)' }}>Examen 2</span>
            </div>
           
            {/* Botón para encoger/expandir sidebar */}
            <button
              onClick={toggleSidebarCompact}
              className="hidden lg:flex ml-4 p-2 rounded-lg hover:bg-gray-100 items-center transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label={isSidebarCompact ? "Expandir panel" : "Minimizar panel"}
            >
              {isSidebarCompact ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
          
          {/* Notificaciones y Menú de Usuario */}
          <div className="flex items-center gap-3">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;