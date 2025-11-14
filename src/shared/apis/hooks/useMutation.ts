import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useToken from '@hooks/useToken'; // Tu hook de token

/**
 * Hook Genérico para operaciones POST
 * @param {string} urlApi - La URL completa para el POST (ej: "http://.../api/institutos/")
 * @param {QueryKey} queryKeyToInvalidate - La "QueryKey" de la lista a refrescar (ej: ['useGetInstitutos'])
 */
export function usePostMutation(urlApi: string, queryKeyToInvalidate: QueryKey) {
    const queryClient = useQueryClient();
    //const navigate = useNavigate(); quiero mostar un modal
    const token = useToken();

    return useMutation({
        // 'data' es lo que viene del formulario, lo tipamos como 'any'
        mutationFn: async (data: any) => {
            const res = await fetch(urlApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Error al crear el recurso');
            }
            return res.json();
        },
        onSuccess: () => {
            // 1. Invalidamos la lista (usando el queryClient directamente)
            queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
            // 2. Navegamos atrás
            //navigate(-1); quiero mostar un modal
        },
        onError: (err: Error) => {
            console.error(`Error en POST a ${urlApi}:`, err);
        }
    });
}

/**
 * Hook Genérico para operaciones PUT (Actualizar)
 * @param {string} urlApiBase - La URL base (ej: "http://.../api/institutos")
 * @param {QueryKey} listQueryKey - La key de la LISTA (ej: ['useGetInstitutos'])
 * @param {string} detailKeyBase - El nombre base de la key de detalle (ej: "useGetInstituto")
 */
export function usePutMutation(urlApiBase: string, listQueryKey: QueryKey, detailKeyBase: string) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const token = useToken();

    return useMutation({
        // 'mutate' recibirá un objeto: { id, ...data }
        mutationFn: async ({ id, ...data }: { id: string | number; [key: string]: any }) => {
            const res = await fetch(`${urlApiBase}/${id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Error al actualizar el recurso');
            }
            return res.json();
        },
        onSuccess: (data: any, variables: { id: string | number }) => {
            const id = variables.id;
            
            // 1. Invalidamos la LISTA
            queryClient.invalidateQueries({ queryKey: listQueryKey });
            
            // 2. Invalidamos el DETALLE de ESE item
            //    (Usando la lógica de tu 'generarQueryKey')
            queryClient.invalidateQueries({ queryKey: [detailKeyBase, { id }] });

            //navigate(-1); quiero mostar un modal
        }
    });
}

/**
 * Hook Genérico para operaciones DELETE
 * @param {string} urlApiBase - La URL base (ej: "http://.../api/institutos")
 * @param {QueryKey} listQueryKey - La key de la LISTA (ej: ['useGetInstitutos'])
 */
export function useDeleteMutation(urlApiBase: string, listQueryKey: QueryKey) {
    const queryClient = useQueryClient();
    const token = useToken();

    return useMutation({
        // 'mutate' recibirá solo el 'id'
        mutationFn: async (id: string | number) => {
            const res = await fetch(`${urlApiBase}/${id}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok && res.status !== 204) { // 204 No Content es un éxito
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Error al eliminar el recurso');
            }
            return id; // Éxito
        },
        onSuccess: () => {
            // Solo invalidamos la lista
            queryClient.invalidateQueries({ queryKey: listQueryKey });
        }
    });
}