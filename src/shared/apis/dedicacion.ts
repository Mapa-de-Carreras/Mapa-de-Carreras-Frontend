import { IDedicacion } from '@globalTypes/dedicaciones'
import { URL_API } from './constantes'
import { useGet } from './hooks/useGet'

export default function useGetDedicaciones() {
    return useGet<IDedicacion[]>({
        key: 'useGetDedicaciones',
        urlApi: `${URL_API}dedicaciones`,
        isEnabled: true,
        params: {},
    })
}
