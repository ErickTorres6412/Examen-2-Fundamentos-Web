// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    // Función para verificar si el token ha expirado
    const isTokenExpired = (token) => {
        try {
            if (!token) return true;
            
            // Decodificar el payload del JWT (parte del medio)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000; // Convertir a segundos
            
            // Verificar si el token ha expirado
            return payload.exp < currentTime;
        } catch (error) {
            console.error('Error al verificar token:', error);
            return true; // Si hay error, considerar como expirado
        }
    };

    // Función para limpiar completamente la sesión
    const clearSession = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    };

    // Función para inicializar el estado de autenticación
    const initializeAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const userInfo = localStorage.getItem('userInfo');
            
            if (token && userInfo) {
                // Verificar si el token no ha expirado
                if (!isTokenExpired(token)) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    setUser({
                        token,
                        ...parsedUserInfo
                    });
                } else {
                    // Token expirado, limpiar localStorage
                    clearSession();
                }
            } else {
                // No hay datos de sesión
                clearSession();
            }
        } catch (error) {
            console.error('Error al inicializar autenticación:', error);
            // En caso de error, limpiar datos
            clearSession();
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    };

    // Inicializar al montar el componente
    useEffect(() => {
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            
            // Llamar al servicio de autenticación
            const result = await authService.login(credentials);
            
            if (result.success) {
                const userData = result.data;

                console.log('Datos de usuario:', userData);
                
                // Extraer el token del objeto anidado
                const token = userData.token?.token || userData.token;
                
                if (!token) {
                    return { 
                        success: false, 
                        error: 'Token no recibido del servidor' 
                    };
                }
                
                // Verificar que el token no esté expirado antes de guardarlo
                if (isTokenExpired(token)) {
                    return {
                        success: false,
                        error: 'El token recibido ya está expirado'
                    };
                }
                
                // Estructura del usuario basada en la respuesta del backend
                const userToStore = {
                    token: token,
                    username: userData.userName,
                    roles: userData.roles || [],
                    // Agregar información adicional si está disponible
                    expiration: userData.token?.expiration
                };
                
                // Guardar en localStorage primero
                localStorage.setItem('token', token);
                localStorage.setItem('userInfo', JSON.stringify({
                    username: userToStore.username,
                    roles: userToStore.roles,
                    expiration: userToStore.expiration
                }));
                
                // Actualizar estado después
                setUser(userToStore);
                
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                error: 'Error de conexión. Por favor intente nuevamente.' 
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // Limpiar inmediatamente
        clearSession();
        
        // Forzar navegación al login
        window.location.href = '/login';
    };

    // Función para verificar autenticación periódicamente
    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            console.log('Token expirado detectado, cerrando sesión...');
            logout();
        }
    };

    // Verificar estado de autenticación cada 5 minutos
    useEffect(() => {
        if (user) {
            const interval = setInterval(checkAuthStatus, 5 * 60 * 1000); // 5 minutos
            return () => clearInterval(interval);
        }
    }, [user]);

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user && !!user.token,
        isInitialized,
        checkAuthStatus // Exponer para uso manual si es necesario
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};