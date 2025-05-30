import { showErrorAlert } from './alertUtils'; 

export const handleApiError = (error, message) => {
  console.error(message + ':', error);
  showErrorAlert(`${message}. Intente de nuevo más tarde.`);
};