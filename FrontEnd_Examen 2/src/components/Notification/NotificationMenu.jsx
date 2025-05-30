import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nuevo pago registrado', time: 'Hace 5 min', read: false },
    { id: 2, message: 'Mantenimiento programado', time: 'Hace 3 horas', read: false },
    { id: 3, message: 'Reunión de propietarios', time: 'Hace 1 día', read: true }
  ]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({
      ...notif,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="relative p-1.5 rounded-full text-white hover:bg-emerald-700/50 transition-colors"
        aria-label="Notificaciones"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notificaciones</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-emerald-600 hover:text-emerald-800"
              >
                Marcar como leídas
              </button>
            )}
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-2 border-b border-gray-50 hover:bg-gray-50 ${notification.read ? 'opacity-70' : ''}`}
                >
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 px-4 py-3 text-center">No hay notificaciones</p>
            )}
          </div>
          
          <div className="px-4 py-2 border-t border-gray-100">
            <a href="/notifications" className="text-xs text-emerald-600 hover:text-emerald-800">
              Ver todas las notificaciones
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;