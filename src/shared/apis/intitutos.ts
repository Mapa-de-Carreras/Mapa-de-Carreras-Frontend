import {Instituto} from '@globalTypes/instituto'
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';
import { usePostMutation, usePutMutation, useDeleteMutation } from '@apis/hooks/useMutation';


export const GET_INSTITUTOS_KEY = "useGetInstitutos";
export default function useGetInstitutos() {
    return useGet<Instituto[]>({
        key: GET_INSTITUTOS_KEY, 
        urlApi: `${URL_API}institutos`,
        isEnabled: true,
        params: {},
    });
}


export const GET_INSTITUTO_KEY = "useGetInstituto";
export function useGetInstituto(id: number) {
    return useGet<Instituto>({
        key: GET_INSTITUTO_KEY,
        urlApi: `${URL_API}institutos/${id}`,
        isEnabled: !!id,
        params: { id },
    });
}


const POST_INSTITUTO_INVALIDATES = [GET_INSTITUTOS_KEY];
export function usePostInstituto() {
    return usePostMutation(
        `${URL_API}institutos/`, 
        POST_INSTITUTO_INVALIDATES 
    );
}


const PUT_INSTITUTO_INVALIDATES_LIST = [GET_INSTITUTOS_KEY];
const PUT_INSTITUTO_INVALIDATES_DETAIL = GET_INSTITUTO_KEY;
export function usePutInstituto() {
    return usePutMutation(
        `${URL_API}institutos`,
        PUT_INSTITUTO_INVALIDATES_LIST,
        PUT_INSTITUTO_INVALIDATES_DETAIL 
    );
}


const DELETE_INSTITUTO_INVALIDATES = [GET_INSTITUTOS_KEY];
export function useDeleteInstituto() {
    return useDeleteMutation(
        `${URL_API}institutos`,
        DELETE_INSTITUTO_INVALIDATES 
    );
}