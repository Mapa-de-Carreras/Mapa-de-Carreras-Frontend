import type { AxiosError } from 'axios'

/**
 * Interpreta un error de Axios (o de la API) para mostrar un mensaje legible al usuario.
 */
export function extraerMensajeDeError(error: AxiosError<any> | null | unknown): string {
    // 1. Manejo de errores no definidos o no-objeto
    if (!error || typeof error !== 'object' || !('isAxiosError' in error)) {
        return 'Ocurrió un error inesperado en el sistema.';
    }

    const axiosError = error as AxiosError<any>;
    const response = axiosError.response;
    
    // 2. Manejo de errores sin respuesta (ej: error de red, timeout)
    if (!response) {
        return 'Error de conexión. Verifica tu red o intenta de nuevo más tarde.';
    }
    
    const statusCode = response.status;
    const data = response.data;
    
    // --- 3. Manejo por Código de Estado (Prioridad Alta) ---

    if (statusCode === 401 || statusCode === 403) {
        return 'Acceso denegado. No tienes permisos para realizar esta acción.';
    }

    if (statusCode === 500) {
        return 'Error interno del servidor. Contacta al soporte si persiste.';
    }

    // --- 4. Extracción de Mensajes Legibles del Body (DRF/Django) ---

    // a) Mensaje global de error (DRF suele usar 'detail' o ser un array de strings)
    if (data && (typeof data === 'string' || Array.isArray(data))) {
        return data.toString();
    }
    if (data && typeof data === 'object' && data.detail) {
        return data.detail;
    }
    
    // --- 5. Extracción de Errores de Validación (400 Bad Request) ---
    
    if (statusCode === 400 && data && typeof data === 'object') {
        // En Django/DRF, los errores de validación son objetos {campo: [errores]}
        const keys = Object.keys(data);

        if (keys.length > 0) {
            const firstKey = keys[0];
            const errorValue = data[firstKey];
            
            // Si el error es una lista de strings (ej: ["Este campo es requerido"])
            if (Array.isArray(errorValue)) {
                return `Error en el campo "${firstKey.replace(/_/g, ' ')}": ${errorValue[0]}`;
            } 
            
            // Si el error es un string simple
            if (typeof errorValue === 'string') {
                return `Error en el campo "${firstKey.replace(/_/g, ' ')}": ${errorValue}`;
            }
        }
        
        // Si es 400 pero no se pudo parsear ningún campo específico
        return 'Error de validación: Verifica los datos ingresados.';
    }
    
    // 6. Mensaje por defecto (Códigos 404, etc.)
    return `La solicitud falló con el código de estado ${statusCode}.`;
}