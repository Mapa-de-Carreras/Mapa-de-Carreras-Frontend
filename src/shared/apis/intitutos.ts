import Instituto from '@globalTypes/instituto'
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';
import { usePostMutation, usePutMutation, useDeleteMutation } from '@apis/hooks/useMutation';

const LIST_KEY = "useGetInstitutos";
const LIST_KEY_NAME = "useGetInstitutos";
const DETAIL_KEY_NAME = "useGetInstituto";

// --- GET (Listado) ---
export default function useGetInstitutos() {
    return useGet<Instituto[]>({
        key: LIST_KEY, // <-- Usa la key
        urlApi: `${URL_API}institutos`,
        isEnabled: true,
        params: {},
    });
}

// --- GET (Detalle por ID) ---
export function useGetInstituto(id: number) {
    return useGet<Instituto>({
        key: DETAIL_KEY_NAME,
        urlApi: `${URL_API}institutos/${id}`,
        isEnabled: !!id, // Solo se ejecuta si hay ID
        params: { id },
    });
}

// --- POST (Crear) ---
export function usePostInstituto() {
    return usePostMutation(
        `${URL_API}institutos/`, // URL Completa para POST
        [LIST_KEY]               // Key de la lista a refrescar
    );
}

// --- PUT (Actualizar) ---
export function usePutInstituto() {
    return usePutMutation(
        `${URL_API}institutos`,  // 1. urlApiBase
        [LIST_KEY_NAME],         // 2. listQueryKey (la de la lista)
        DETAIL_KEY_NAME          // 3. detailKeyBase (el nombre de la key de detalle)
    );
}

// --- DELETE (Borrar) ---
export function useDeleteInstituto() {
    return useDeleteMutation(
        `${URL_API}institutos`, // URL Base (el hook le pondrá /id/)
        [LIST_KEY]              // Key de la lista a refrescar
    );
}