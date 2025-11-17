import { Usuario } from '@globalTypes/usuario'
import { URL_API } from './constantes'
import { useGet } from './hooks/useGet'

export function useGetUsuarios() {
    return useGet<Usuario[]>({
        key: 'useGetUsuarios',
        urlApi: `${URL_API}usuarios`,
        isEnabled: true,
        params: {},
    })
}

type useGetUsuarioProps = {
    id: number,
    habilitado: boolean,
};

export function useGetUsuario({ id, habilitado }: useGetUsuarioProps) {
    return useGet<Usuario>({
        key: 'useGetUsuario',
        urlApi: `${URL_API}usuarios/{id}`,
        isEnabled: habilitado,
        params: { id },
    })
}
