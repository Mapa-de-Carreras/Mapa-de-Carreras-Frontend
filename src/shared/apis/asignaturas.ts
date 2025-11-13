import { URL_API } from './constantes'
import { Asignatura,  AsignaturaPayload } from '@globalTypes/asignatura'
import { useGet } from './hooks/useGet'
import { useState, useCallback } from 'react';

export default function useGetAsignaturas() {
	return useGet<Asignatura[]>({
		key: 'useGetAsignaturas',
		urlApi: `${URL_API}asignaturas`,
		isEnabled: true,
		params: {},
	})
}

export function useGetAsignatura( id : number ){
	return useGet<Asignatura>({
		key: "useGetAsignatura",
		urlApi: `${URL_API}asignaturas/${id}/`,
		isEnabled: !!id,
		params: {},
	});
}

// --- HOOKS DE MUTACIÓN (POST, PUT, DELETE) ---

/**
 * Hook para CREAR una nueva asignatura.
 * Emula el 'useMutation' de TanStack Query.
 */
export function usePostAsignatura() {
    const [data, setData] = useState<Asignatura | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Función 'mutate' que ejecuta la petición POST.
     * @param payload Los datos de la AsignaturaPayload a crear.
     */
    const mutate = useCallback(async (payload: AsignaturaPayload) => {
        setLoading(true);
        setError(null);
        setData(null);
        
        const token = localStorage.getItem('access_token');
        if (!token) {
            const err = new Error('No se encontró el token de autenticación.');
            setError(err);
            setLoading(false);
            throw err; // Lanza el error para que el .catch() del componente lo reciba
        }

        try {
            const response = await fetch(`${URL_API}asignaturas/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear la asignatura.');
            }

            const result = await response.json();
            setData(result);
            return result; // Devuelve el resultado por si se usa 'await'
        } catch (err) {
            setError(err as Error);
            throw err; // Vuelve a lanzar para el .catch()
        } finally {
            setLoading(false);
        }
    }, []); // 'useCallback' asegura que la función 'mutate' sea estable

    return { mutate, data, loading, error };
}


/**
 * Hook para ACTUALIZAR una asignatura existente.
 * Emula el 'useMutation' de TanStack Query.
 */
export function usePutAsignatura() {
    const [data, setData] = useState<Asignatura | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Función 'mutate' que ejecuta la petición PUT.
     * @param id El ID de la asignatura a actualizar.
     * @param payload Los datos de la AsignaturaPayload.
     */
    const mutate = useCallback(async (id: number, payload: AsignaturaPayload) => {
        setLoading(true);
        setError(null);
        setData(null);

        const token = localStorage.getItem('access_token');
        if (!token) {
            const err = new Error('No se encontró el token de autenticación.');
            setError(err);
            setLoading(false);
            throw err;
        }

        try {
            const response = await fetch(`${URL_API}asignaturas/${id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar la asignatura.');
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { mutate, data, loading, error };
}


/**
 * Hook para ELIMINAR una asignatura.
 * Emula el 'useMutation' de TanStack Query.
 */
export function useDeleteAsignatura() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Función 'mutate' que ejecuta la petición DELETE.
     * @param id El ID de la asignatura a eliminar.
     */
    const mutate = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('access_token');
        if (!token) {
            const err = new Error('No se encontró el token de autenticación.');
            setError(err);
            setLoading(false);
            throw err;
        }

        try {
            const response = await fetch(`${URL_API}asignaturas/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${response.status}: No se pudo eliminar la asignatura.`);
            }
            
            // Éxito, no hay 'data' que devolver
            return;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Devuelve 'loading' y 'error', pero no 'data' ya que DELETE no devuelve
    return { mutate, loading, error };
}