import { URL_API } from "./constantes";
import useGet from './hooks/useGet';
import usePost from './hooks/usePost';
import usePut from './hooks/usePut';
import useDelete from './hooks/useDelete';
import { GET_TYPE_INSTITUTO, GET_TYPE_INSTITUTOS, POST_TYPE_INSTITUTO, PUT_TYPE_INSTITUTO } from "@globalTypes/instituto";


export function useGetInstitutos() {
    return useGet<GET_TYPE_INSTITUTOS>({
        key: 'useGetInstitutos', 
        urlApi: `${URL_API}institutos/`,
        isEnabled: true,
    });
}

export function useGetInstituto(id: number) {
    return useGet<GET_TYPE_INSTITUTO>({
        key: 'useGetInstituto',
        urlApi: `${URL_API}institutos/${id}/`,
        isEnabled: !!id
    });
}

export function usePostInstituto() {
    return usePost<POST_TYPE_INSTITUTO>({
        key: 'usePostInstituto',
        urlApi: `${URL_API}institutos/`,
    })
}

export function usePutInstituto() {
    return usePut<PUT_TYPE_INSTITUTO>({
        key: 'usePutInstituto',
        urlApi: `${URL_API}institutos/{id}/`,
    })
}

export function useDeleteInstituto() {
    return useDelete({
        key: 'useDeleteInstituto',
        urlApi: `${URL_API}institutos/{id}/`, 
    })
}
