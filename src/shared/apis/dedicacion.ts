import { Dedicacion, DedicacionPostPayload, DedicacionPutPayload, DedicacionResponse } from '@globalTypes/dedicaciones'
import { URL_API } from './constantes'
import useGet  from './hooks/useGet'
import usePost from './hooks/usePost'
import usePut from './hooks/usePut'
import useDelete from './hooks/useDelete'
import { ParamsBase } from './hooks/types'

export default function useGetDedicaciones() {
    return useGet<Dedicacion[]>({
        key: 'useGetDedicaciones',
        urlApi: `${URL_API}dedicaciones`,
    })
}

type useGetDedicacionProps = {
    id?: string,
    habilitado: boolean,
}

export function useGetDedicacion({ id, habilitado }: useGetDedicacionProps) {
    return useGet<DedicacionResponse, { id?: string }>({
        key: 'useGetDedicacion',
        urlApi: `${URL_API}dedicaciones/{id}`,
        isEnabled: habilitado,
        params: { id },
    })
}

export function usePostDedicacion() {
    return usePost<DedicacionResponse, Error, ParamsBase, DedicacionPostPayload>({
        key: 'usePostDedicacion',
        urlApi: `${URL_API}dedicaciones/`,
        queriesToInvalidate: ["useGetDedicacion"]
    })
}

export function usePutDedicacion() {
    return usePut<DedicacionResponse, Error, { id: string | number }, DedicacionPutPayload>({
        key: 'usePutDedicacion',
        urlApi: `${URL_API}dedicaciones/{id}/`,
        queriesToInvalidate: ["useGetDedicacion"]
    })
}

type useDeleteDedicacionProps = {
    queriesToInvalidate: string[],
};

export function useDeleteDedicacion({ queriesToInvalidate }: useDeleteDedicacionProps) {
    return useDelete<DedicacionResponse, Error, { id: string | number }>({
        key: 'useDeleteDedicacion',
        urlApi: `${URL_API}dedicaciones/{id}/`,
        queriesToInvalidate
    })
}