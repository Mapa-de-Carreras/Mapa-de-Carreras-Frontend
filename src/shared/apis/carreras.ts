import { URL_API } from './constantes'
import { GetCarrera, PostCarrera, PutCarrera } from '@globalTypes/carrera'
import { useGet } from './hooks/useGet'
import { useState, useCallback } from 'react';

export default function useGetCarreras() {
    return useGet<GetCarrera[]>({
        key: 'useGetCarreras',
        urlApi: `${URL_API}carreras`,
        isEnabled: true,
        params: {},
    })
}

export function useGetCarrerasPorInstituto(id: number) {
    return useGet<GetCarrera[]>({
        key: 'useGetCarreras',
        urlApi: `${URL_API}carreras/?instituto_id=${id}`,
        isEnabled: true,
        params: {},
    })
}

export function useGetCarrera( id : number ){
    return useGet<GetCarrera>({
        key: "useGetCarrera",
        urlApi: `${URL_API}carreras/${id}/`,
        isEnabled: !!id,
        params: {},
    });
}

// --- HOOKS DE MUTACIÓN (POST, PUT, DELETE) ---

/**
 * Hook para CREAR una nueva carrera.
 * Emula el 'useMutation' de TanStack Query.
 */
export function usePostCarrera() {
    const [data, setData] = useState<PostCarrera | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Función 'mutate' que ejecuta la petición POST.
     * @param payload Los datos de la CarreraPayload a crear.
     */
    const mutate = useCallback(async (payload: PostCarrera) => {
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
            const response = await fetch(`${URL_API}carreras/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear la carrera.');
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
 * Hook para ACTUALIZAR una carrera existente.
 * Emula el 'useMutation' de TanStack Query.
 */
export function usePutCarrera() {
    const [data, setData] = useState<PutCarrera | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Función 'mutate' que ejecuta la petición PUT.
     * @param id El ID de la carrera a actualizar.
     * @param payload Los datos de la CarreraPayload.
     */
    const mutate = useCallback(async (id: number, payload: PutCarrera) => {
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
            const response = await fetch(`${URL_API}carreras/${id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar la carrera.');
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
 * Hook para ELIMINAR una carrera.
 * Emula el 'useMutation' de TanStack Query.
 */
export function useDeleteCarrera() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Función 'mutate' que ejecuta la petición DELETE.
     * @param id El ID de la carrear a eliminar.
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
            const response = await fetch(`${URL_API}carreras/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${response.status}: No se pudo eliminar la carreras.`);
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
