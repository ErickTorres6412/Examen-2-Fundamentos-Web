// src/hooks/useLoginForm.js
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validación básica
      if (!username || !password) {
        setError('Por favor complete todos los campos');
        return;
      }

      if (username.length < 3) {
        setError('El nombre de usuario debe tener al menos 3 caracteres');
        return;
      }

      if (password.length < 2) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      // Preparar credenciales
      const credentials = {
        userName: username.trim(),
        password: password
      };

      // Intentar hacer login
      const result = await login(credentials);

      if (result.success) {
        // Obtener la ruta a la que se quería acceder antes del login
        const from = location.state?.from?.pathname || '/dashboard';
        
        // Redireccionar
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
      
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error de conexión. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar el formulario
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setError('');
    setShowPassword(false);
    setRememberMe(false);
  };

  // Función para limpiar solo el error
  const clearError = () => {
    setError('');
  };

  const formState = {
    username,
    password,
    loading,
    showPassword,
    rememberMe,
    error
  };

  const formHandlers = {
    setUsername,
    setPassword,
    setShowPassword,
    setRememberMe,
    handleSubmit,
    resetForm,
    clearError
  };

  return {
    ...formState,
    ...formHandlers
  };
};