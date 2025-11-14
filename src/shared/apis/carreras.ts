// Asumo que el tipo se llama 'Carrera' y está en esta ruta
import {CarreraListItem, CarreraDetail} from '@globalTypes/carrera'; 
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';
import { usePostMutation, usePutMutation, useDeleteMutation } from '@apis/hooks/useMutation';

// 1. Define las keys específicas para 'carreras'
const LIST_KEY = "useGetCarreras";
const LIST_KEY_NAME = "useGetCarrera";
const DETAIL_KEY_NAME = "useGetCarrera";

// --- GET (Listado) ---
export default function useGetCarreras() {
    return useGet<CarreraListItem[]>({ // Asumo un tipo Carrera[]
        key: LIST_KEY,
        urlApi: `${URL_API}carreras`,
        isEnabled: true,
        params: {},
    });
}

// --- GET (Detalle por ID) ---
export function useGetCarrera(id: number) {
    return useGet<CarreraDetail>({ // Asumo un tipo Carrera
        key: DETAIL_KEY_NAME,
        urlApi: `${URL_API}carreras/${id}`,
        isEnabled: !!id, // Solo se ejecuta si hay ID
        params: { id },
    });
}

export function useGetCarrerasPorInstituto(instituto_id: number) {
    return useGet<CarreraListItem[]>({ // Devuelve el mismo tipo de lista
        key: LIST_KEY, // Usa la misma key BASE ('useGetCarreras')
        urlApi: `${URL_API}carreras`, // La misma URL base
        
        // --- ¡AQUÍ ESTÁ LA MAGIA! ---
        // 1. Tu 'fetcher' convertirá esto en "?instituto_id=1" (o el id que sea)
        // 2. Tu 'generarQueryKey' creará una key única: 
        //    ['useGetCarreras', { instituto_id: 1 }]
        params: {
            queryParams: { instituto_id }
        }, 
        
        // Opcional: solo ejecuta la consulta si el ID es válido (no es 0, null, o undefined)
        isEnabled: !!instituto_id && instituto_id > 0, 
    });
}

// --- POST (Crear) ---
export function usePostCarrera() {
    return usePostMutation(
        `${URL_API}carreras/`, // URL Completa para POST
        [LIST_KEY]         // Key de la lista a refrescar
    );
}

// --- PUT (Actualizar) ---
export function usePutCarrera() {
    return usePutMutation(
        `${URL_API}carreras`,  // URL Base (el hook le pondrá /id/)
        [LIST_KEY_NAME],        // Key de la lista a refrescar
        DETAIL_KEY_NAME        // Nombre de la key de detalle
    );
}

// --- DELETE (Borrar) ---
export function useDeleteCarrera() {
    return useDeleteMutation(
        `${URL_API}carreras`, // URL Base (el hook le pondrá /id/)
        [LIST_KEY]        // Key de la lista a refrescar
    );
}