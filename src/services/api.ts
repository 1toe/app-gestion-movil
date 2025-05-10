import axios from 'axios';
import { Product } from '@/types';

// Configuración base de API
const API_BASE_URL = "http://143.198.118.203:8100";
const API_USER = "test";
const API_PASS = "test2023";

// Crear instancia de axios con configuración de autenticación básica
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: API_USER,
    password: API_PASS
  }
});

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get('/ejemplos/product_list_rest/');
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  add: async (data: { product_name: string; product_price: number; product_image: string }): Promise<any> => {
    try {
      const response = await apiClient.post('/ejemplos/product_add_rest/', data);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },
  
  update: async (data: { 
    product_id: number; 
    product_name: string; 
    product_price: number; 
    product_image: string;
    product_state: string;
  }): Promise<any> => {
    try {
      const response = await apiClient.post('/ejemplos/product_edit_rest/', data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  
  delete: async (product_id: number): Promise<any> => {
    try {
      const response = await apiClient.post('/ejemplos/product_del_rest/', { product_id });
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// También podemos implementar los servicios para categorías y proveedores
export const categoriesApi = {
  // Implementación similar...
};

export const providersApi = {
  // Implementación similar...
};
