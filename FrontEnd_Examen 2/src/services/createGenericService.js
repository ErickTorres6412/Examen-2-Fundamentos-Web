import { api } from './api'; // Usa la misma instancia que funciona

export const createGenericService = (baseEndpoint) => ({
  getAll: async () => {
    try {
      console.log(`📋 Obteniendo todos los elementos de: ${baseEndpoint}`);
      const response = await api.get(baseEndpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching items from ${baseEndpoint}:`, error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      console.log(`🔍 Obteniendo elemento ${id} de: ${baseEndpoint}`);
      const response = await api.get(`${baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with id ${id} from ${baseEndpoint}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      console.log(`➕ Creando elemento en: ${baseEndpoint}`, data);
      const response = await api.post(baseEndpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating item in ${baseEndpoint}:`, error);
      throw error;
    }
  },

  update: async (data) => {
    try {
      console.log(`✏️ Actualizando elemento en: ${baseEndpoint}`, data);
      const response = await api.put(baseEndpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating item in ${baseEndpoint}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      console.log(`🗑️ Eliminando elemento ${id} de: ${baseEndpoint}`);
      const response = await api.delete(`${baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item with id ${id} from ${baseEndpoint}:`, error);
      throw error;
    }
  }
});