import { ICargo } from '@globalTypes/cargos'
import { URL_API } from './constantes'
import  useGet  from './hooks/useGet'


export function useGetCargos() {
    return useGet<ICargo[]>({
        key: 'useGetCargos',
        urlApi: `${URL_API}cargos`,
        isEnabled: true,
        params: {},
    })
}