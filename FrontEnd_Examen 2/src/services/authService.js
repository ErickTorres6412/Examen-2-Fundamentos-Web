// src/services/authService.js
import api from './api';

export const authService = {
    // Función para hacer login
    async login(credentials) {
        try {
            const response = await api.post('api/auth/login', credentials);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error de conexión'
            };
        }
    },
};