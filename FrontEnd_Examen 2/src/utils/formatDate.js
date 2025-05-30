// Función para formatear fechas en el formato deseado
export const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
    }
};