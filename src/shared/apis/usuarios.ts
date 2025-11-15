import { IUsuario } from '@globalTypes/usuario'
import { URL_API } from './constantes'
import { useGet } from './hooks/useGet'

export default function useGetUsuarios() {
    return useGet<IUsuario[]>({
        key: 'useGetUsuarios',
        urlApi: `${URL_API}usuarios`,
        isEnabled: true,
        params: {},
    })
}
