// Asumo que el tipo se llama 'Carrera' y está en esta ruta
import { GET_TYPE_CARRERA, GET_TYPE_CARRERAS_LIST, POST_TYPE_CARRERA, PUT_TYPE_CARRERA } from '@globalTypes/carrera'; 
import { URL_API } from "./constantes";
import useGet from './hooks/useGet';
import usePost from './hooks/usePost';
import usePut from './hooks/usePut';
import useDelete from './hooks/useDelete';
import usePatch from "./hooks/usePatch";



export default function useGetCarreras() {
    return useGet<GET_TYPE_CARRERAS_LIST>({
        key: 'useGetCarreras', 
        urlApi: `${URL_API}carreras/`,
    });
}

export function useGetCarrera(id: number) {
    return useGet<GET_TYPE_CARRERA>({
        key: 'useGetCarrera', 
        urlApi: `${URL_API}carreras/${id}/`,
    });
}

export function useGetCarrerasPorInstituto(instituto_id: number) {
    return useGet<GET_TYPE_CARRERAS_LIST>({ 
        key: 'useGetCarrerasPorInstituto', 
        urlApi: `${URL_API}carreras/`,
        params: {
            queryParams: { instituto_id }
        }, 
    });
}

export function usePostCarrera() {
    return usePost<POST_TYPE_CARRERA>({
        key: 'usePostCarrera',
        urlApi: `${URL_API}carreras/`,
    });
}

export function usePutCarrera() {
    return usePut<PUT_TYPE_CARRERA>({
        key: 'usePutCarrera',
        urlApi: `${URL_API}carreras/{id}/`,
    });
}

export function useDeleteCarrera() {
    return useDelete({
        key: 'useDeleteCarrera',
        urlApi: `${URL_API}carreras/{id}/`,
    });
}

export function usePatchCarrera(id : number) {
    return usePatch<PUT_TYPE_CARRERA>({
        key: 'usePatchCarrera',
        urlApi: `${URL_API}carreras/${id}/vagencia/`,
        params: {
            queryParams : { id }
        }
    });
}