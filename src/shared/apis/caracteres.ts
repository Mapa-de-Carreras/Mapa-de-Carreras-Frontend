import { CaracterPostPayload, CaracterPutPayload, CaracterResponse } from '@globalTypes/caracter'
import { URL_API } from './constantes'
import useGet  from './hooks/useGet'
import usePost from './hooks/usePost'
import usePut from './hooks/usePut'
import useDelete from './hooks/useDelete'
import { ParamsBase } from './hooks/types'

export function useGetCaracteres() {
    return useGet<CaracterResponse[]>({
        key: 'useGetCaracteres',
        urlApi: `${URL_API}caracteres/`,
    })
}

type useGetCaracterProps = {
    id?: string,
    habilitado: boolean,
}

export function useGetCaracter({ id, habilitado }: useGetCaracterProps) {
    return useGet<CaracterResponse, { id?: string }>({
        key: 'useGetCaracter',
        urlApi: `${URL_API}caracteres/{id}`,
        isEnabled: habilitado,
        params: { id },
    })
}

export function usePostCaracter() {
    return usePost<CaracterResponse, Error, ParamsBase, CaracterPostPayload>({
        key: 'usePostCaracter',
        urlApi: `${URL_API}caracteres/`,
        queriesToInvalidate: ["useGetCaracter"]
    })
}

export function usePutCaracter() {
    return usePut<CaracterResponse, Error, { id: string | number }, CaracterPutPayload>({
        key: 'usePutCaracter',
        urlApi: `${URL_API}caracteres/{id}/`,
        queriesToInvalidate: ["useGetCaracter"]
    })
}

type useDeleteCaracterProps = {
    queriesToInvalidate: string[],
};

export function useDeleteCaracter({ queriesToInvalidate }: useDeleteCaracterProps) {
    return useDelete<CaracterResponse, Error, { id: string | number }>({
        key: 'useDeleteCaracter',
        urlApi: `${URL_API}caracteres/{id}/`,
        queriesToInvalidate
    })
}
