import { URL_API } from './constantes'
import {
	GET_TYPE_ASIGNATURA, 
	GET_TYPE_ASIGNATURAS_LISTA,
	GET_TYPE_CORRELATIVAS_ASIGNATURA,
	POST_TYPE_ASIGNATURA,
	PUT_TYPE_ASIGNATURA} from '@globalTypes/asignatura'
import useGet from '@apis/hooks/useGet';
import usePost from './hooks/usePost';
import usePut from './hooks/usePut';
import useDelete from './hooks/useDelete';

export function useGetAsignaturas(activas?: boolean) { 
    return useGet<GET_TYPE_ASIGNATURAS_LISTA>({ 
        key: `useGetAsignaturas-${activas}`,
        urlApi: `${URL_API}asignaturas/`, 
        params: {
            queryParams: activas !== undefined ? { activas } : {}
        }, 
    });
}

export function useGetAsignatura(id: number){
	return useGet<GET_TYPE_ASIGNATURA>({
		key: 'useGetAsignatura',
		urlApi: `${URL_API}asignaturas/${id}`
	})
}

export function useGetAsignaturaYcorrelativas(asignatura_id:number, plan_id:number){
	return useGet<GET_TYPE_CORRELATIVAS_ASIGNATURA>({
		key:'useGetAsignaturaYcorrelativas',
		urlApi:  `${URL_API}asignaturas/${asignatura_id}/plan/${plan_id}`
	})
}

export function usePostAsignatura(){
	return usePost<POST_TYPE_ASIGNATURA>({
		key: 'usePostAsignatura',
		urlApi: `${URL_API}asignaturas/`,
	})
}

export function usePutAsignatura(){
	return usePut<PUT_TYPE_ASIGNATURA>({
		key: 'usePutAsignatura',
		urlApi: `${URL_API}asignaturas/{id}/`
	})
}

export function useDeleteAsignatura(){
	return useDelete({
		key: 'useDeleteAsignatura',
		urlApi: `${URL_API}asignaturas/{id}/`
	})
}