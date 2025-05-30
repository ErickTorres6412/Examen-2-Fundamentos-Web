import React, { useState, useEffect } from 'react';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import modules from '../../../config/modules';
import '../../../styles/theme.css';

const Sidebar = ({ isOpen, isCompact }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedModule, setExpandedModule] = useState(null);
  const [activeItem, setActiveItem] = useState('/dashboard');

  useEffect(() => {
    setActiveItem(location.pathname);
    
    modules.forEach((module, index) => {
      if (module.subItems.some(item => item.link === location.pathname)) {
        setExpandedModule(index);
      }
    });
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-full pt-16 transition-transform duration-300 ease-in-out shadow-sm border-r
        ${isCompact ? 'w-20' : 'w-64'} 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0`}
      style={{ 
        background: 'white',
        borderColor: 'var(--color-sidebar-bg)'
      }}
    >
      <div className="h-full overflow-y-auto pb-20 scrollbar-thin">
        {/* Botón de Dashboard */}
        <button
          onClick={() => handleNavigate('/dashboard')}
          className={`w-full flex items-center ${isCompact ? 'justify-center' : 'gap-3 px-4'} py-3 transition-all duration-200`}
          style={{ 
            backgroundColor: activeItem === '/dashboard' ? 'var(--color-sidebar-bg)' : 'transparent',
            color: activeItem === '/dashboard' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            borderLeft: activeItem === '/dashboard' ? '3px solid var(--color-primary)' : '3px solid transparent'
          }}
        >
          <LayoutDashboard size={18} style={{ color: activeItem === '/dashboard' ? 'var(--color-primary)' : 'var(--color-text-muted)' }} />
          {!isCompact && <span className="text-sm font-medium">Dashboard</span>}
        </button>
  
        {/* Categoría */}
        {!isCompact && (
          <div className="px-4 py-3 mt-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>General</h2>
          </div>
        )}
  
        {/* Módulos */}
        {modules.map((module, index) => (
          <div key={index} className="mb-1">
            <button
              onClick={() => {
                if (!isCompact) {
                  setExpandedModule(expandedModule === index ? null : index);
                } else if (module.subItems.length > 0) {
                  handleNavigate(module.subItems[0].link);
                }
              }}
              className={`w-full flex items-center ${isCompact ? 'justify-center' : 'justify-between px-4'} py-3 transition-all duration-200`}
              style={{ 
                backgroundColor: expandedModule === index ? 'var(--color-sidebar-bg)' : 'transparent',
                color: expandedModule === index ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderLeft: expandedModule === index && !isCompact ? '3px solid var(--color-primary)' : '3px solid transparent'
              }}
            >
              <div className={`flex items-center ${isCompact ? '' : 'gap-3'}`}>
                <module.icon 
                  size={18} 
                  style={{ color: expandedModule === index ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                />
                {!isCompact && <span className="text-sm font-medium">{module.title}</span>}
              </div>
              {!isCompact && (
                <ChevronRight
                  size={16}
                  className={`transform transition-transform duration-200`}
                  style={{ 
                    color: expandedModule === index ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    transform: expandedModule === index ? 'rotate(90deg)' : 'rotate(0deg)'
                  }}
                />
              )}
            </button>
            
            {/* Subitems */}
            {!isCompact && (
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden
                  ${expandedModule === index ? 'max-h-60' : 'max-h-0'}`}
              >
                {module.subItems.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleNavigate(item.link)}
                    className={`block w-full text-left pl-12 pr-4 py-2.5 text-sm transition-colors`}
                    style={{ 
                      backgroundColor: activeItem === item.link ? 'var(--color-sidebar-bg)' : 'transparent',
                      color: activeItem === item.link ? 'var(--color-primary)' : 'var(--color-text-muted)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
