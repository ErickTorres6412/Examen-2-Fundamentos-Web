// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const Layout = ({ children }) => { // <- CAMBIO: Recibir children como prop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleSidebarCompact = () => {
    setIsSidebarCompact(!isSidebarCompact);
  };
  
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        toggleSidebarCompact={toggleSidebarCompact}
        isSidebarCompact={isSidebarCompact}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        isCompact={isSidebarCompact}
      />
     
      {/* Contenido principal */}
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? (isSidebarCompact ? 'lg:ml-20' : 'lg:ml-64') : ''}`}>
        <div className="p-6 pt-20">
          {children} {/* CAMBIO: Usar children en lugar de Outlet */}
        </div>
      </main>
    </div>
  );
};

export default Layout;