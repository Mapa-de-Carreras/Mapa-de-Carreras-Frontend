// Asumo que el tipo se llama 'Carrera' y está en esta ruta
import {CarreraListItem, CarreraDetail} from '@globalTypes/carrera'; 
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';
import { usePostMutation, usePutMutation, useDeleteMutation } from '@apis/hooks/useMutation';


export const GET_CARRERAS_KEY = "useGetCarreras";
export default function useGetCarreras() {
    return useGet<CarreraListItem[]>({
        key: GET_CARRERAS_KEY, 
        urlApi: `${URL_API}carreras`,
        isEnabled: true,
        params: {},
    });
}

export const GET_CARRERA_KEY = "useGetCarrera";
export function useGetCarrera(id: number) {
    return useGet<CarreraDetail>({ 
        key: GET_CARRERA_KEY, 
        urlApi: `${URL_API}carreras/${id}`,
        isEnabled: !!id,
        params: {},
    });
}

export const GET_CARRERAS_POR_INSTITUTO_KEY = "useGetCarrerasPorInstituto";
export function useGetCarrerasPorInstituto(instituto_id: number) {
    return useGet<CarreraListItem[]>({ 
        key: GET_CARRERAS_POR_INSTITUTO_KEY, 
        urlApi: `${URL_API}carreras`,
        params: {
            queryParams: { instituto_id }
        }, 
        isEnabled: !!instituto_id && instituto_id > 0, 
    });
}

const POST_CARRERA_INVALIDATES = [GET_CARRERAS_KEY];
export function usePostCarrera() {
    return usePostMutation(
        `${URL_API}carreras/`,
        POST_CARRERA_INVALIDATES 
    );
}


const PUT_CARRERA_INVALIDATES_LIST = [GET_CARRERAS_KEY]; 
const PUT_CARRERA_INVALIDATES_DETAIL = GET_CARRERA_KEY;
export function usePutCarrera() {
    return usePutMutation(
        `${URL_API}carreras`,
        PUT_CARRERA_INVALIDATES_LIST,  
        PUT_CARRERA_INVALIDATES_DETAIL  
    );
}


const DELETE_CARRERA_INVALIDATES = [GET_CARRERAS_KEY];
export function useDeleteCarrera() {
    return useDeleteMutation(
        `${URL_API}carreras`,
        DELETE_CARRERA_INVALIDATES 
    );
}