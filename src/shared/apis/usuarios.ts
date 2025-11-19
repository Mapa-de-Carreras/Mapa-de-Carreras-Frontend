import { Usuario } from '@globalTypes/usuario'
import { URL_API } from './constantes'
import { useGet } from './hooks/useGet'
import usePost, { UsePostProps } from './hooks/usePost'
import { ParamsBase } from './hooks/types'

export function useGetUsuarios() {
	return useGet<Usuario[]>({
		key: 'useGetUsuarios',
		urlApi: `${URL_API}usuarios`,
		isEnabled: true,
		params: {},
	})
}

type useGetUsuarioProps = {
	id: number
	habilitado: boolean
}

export function useGetUsuario({ id, habilitado }: useGetUsuarioProps) {
	return useGet<Usuario>({
		key: 'useGetUsuario',
		urlApi: `${URL_API}usuarios/{id}`,
		isEnabled: habilitado,
		params: { id },
	})
}

export function useGetUsuarioActual({ id, habilitado }: useGetUsuarioProps) {
	return useGet<Usuario>({
		key: 'useGetUsuarioActual',
		urlApi: `${URL_API}usuarios/{id}`,
		isEnabled: habilitado,
		params: { id },
	})
}

type UsePostUsuarioOptions<
	TData = unknown,
	TError = Error,
	TBody = unknown,
	TContext = unknown,
> = Omit<UsePostProps<TData, TError, ParamsBase, TBody, TContext>, 'urlApi' | 'key' | 'params'>

export type UsuarioResponse = Usuario

export type UsuarioCreatePayload = Omit<Usuario, 'id' | 'is_staff' | 'is_active'>

export function usePostUsuario(
    options: UsePostUsuarioOptions<UsuarioResponse, Error, ParamsBase, UsuarioCreatePayload>
) {
	return usePost({
		key: 'usePostUsuario',
		urlApi: `${URL_API}auth/registrar-usuario/`,
		...options,
	})
}

export type ActivarCuentaResponse = {
    email: string
    code: string
};

export type ActivarCuentaPayload = {
    email: string
    code: string
};

export function usePostVerificarUsuario(
    options: UsePostUsuarioOptions<ActivarCuentaResponse, Error, ParamsBase, ActivarCuentaPayload>
) {
	return usePost({
		key: 'usePostVerificarUsuario',
		urlApi: `${URL_API}auth/registrar/activar-cuenta/`,
		...options,
	})
}
