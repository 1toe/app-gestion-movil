import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

/**
 * Maneja errores de API y devuelve un mensaje apropiado
 */
export function handleApiError(
  error: unknown, 
  defaultMessage: string = 'Ha ocurrido un error. Por favor intenta nuevamente.',
  consoleLog: boolean = true
): string {
  if (consoleLog) {
    console.error('API Error:', error);
  }
  
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Error de red o servidor no disponible
    if (!axiosError.response) {
      return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    }
    
    // Errores específicos por código de estado
    switch (axiosError.response.status) {
      case 400:
        return 'La solicitud contiene errores. Por favor verifica los datos e intenta nuevamente.';
      case 401:
        return 'No autorizado. Por favor inicia sesión nuevamente.';
      case 403:
        return 'No tienes permiso para realizar esta acción.';
      case 404:
        return 'El recurso solicitado no fue encontrado.';
      case 500:
        return 'Error en el servidor. Por favor intenta más tarde.';
      default:
        return `Error: ${axiosError.response.status} - ${axiosError.message}`;
    }
  }
  
  // Si el error no es de axios, devolver mensaje por defecto
  if (error instanceof Error) {
    return error.message;
  }
  
  return defaultMessage;
}

/**
 * Verifica si un error es debido a problemas de conexión
 */
export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response && !!error.request;
  }
  return false;
};

/**
 * Verifica si un error es debido a autenticación (401)
 */
export const isAuthError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
};
