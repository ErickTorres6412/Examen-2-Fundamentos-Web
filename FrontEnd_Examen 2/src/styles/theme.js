// src/styles/theme.js
export const theme = {
    colors: {
      // Verde oliva (color principal)
      primary: '#556B2F',
      primaryLight: '#6B8E23',
      primaryDark: '#3B4A1F',
      
      // Fondos
      background: '#F4F7F1',       // Verde muy claro para fondo
      sidebarBg: '#EAEFE5',        // Verde más claro para sidebar
      navbarBg: '#4A5D28',         // Verde oliva oscuro para navbar
      
      // Acentos
      accent1: '#8FA36C',          // Verde oliva claro
      accent2: '#D0D6C2',          // Verde grisáceo muy claro
      
      // Botones
      buttonPrimary: '#556B2F',    // Verde oliva (principal)
      buttonSecondary: '#7D8F69',  // Verde grisáceo
      buttonCancel: '#C74B50',     // Rojo suave
      
      // Texto
      textDark: '#333333',         // Casi negro
      textLight: '#FFFFFF',        // Blanco
      textMuted: '#6C757D',        // Gris para texto secundario
      
      // Usuario
      userBubble: '#8FA36C',       // Verde oliva claro
      
      // Estado
      success: '#2E8B57',          // Verde mar para éxito
      warning: '#DAA520',          // Dorado para advertencia
      error: '#C74B50',            // Rojo suave para error
      info: '#4682B4'              // Azul acero para información
    },
    
    gradients: {
      navbar: 'linear-gradient(to right, #4A5D28, #556B2F)',
      sidebarTop: 'linear-gradient(to right, #6B8E23, #556B2F)',
      sidebarBottom: 'linear-gradient(to right, #D0D6C2, #8FA36C)',
      button: 'linear-gradient(to right, #556B2F, #6B8E23)',
      tableHeader: 'linear-gradient(to right, #F4F7F1, #EAEFE5)'
    },
    
    // Clases de Tailwind predefinidas
    tailwind: {
      // Backgrounds
      navbarBg: 'bg-custom-navbarBg',
      sidebarBg: 'bg-custom-sidebarBg',
      pageBg: 'bg-custom-background',
      
      // Gradientes comunes
      navbarGradient: 'bg-gradient-to-r from-primary-dark to-primary',
      buttonGradient: 'bg-gradient-to-r from-primary to-primary-light',
      
      // Botones
      buttonPrimary: 'bg-button-primary hover:bg-primary-light text-white',
      buttonSecondary: 'bg-button-secondary hover:bg-accent-1 text-white',
      buttonCancel: 'bg-button-cancel hover:bg-state-error text-white',
      
      // Utilitarios
      borderPrimary: 'border-primary',
      textPrimary: 'text-primary',
      textSecondary: 'text-accent-1',
    }
  };
  
  // Exportar específicamente para mayor comodidad
  export const colors = theme.colors;
  export const gradients = theme.gradients;
  export const tw = theme.tailwind;
  
  export default theme;