import { Usuario, UsuarioPostPayload, UsuarioPutPayload, UsuarioResponse } from '@globalTypes/usuario'
import { URL_API } from './constantes'
import useGet from './hooks/useGet'
import usePost from './hooks/usePost'
import useDelete from './hooks/useDelete'
import usePatch from './hooks/usePatch'
import usePut from './hooks/usePut'

export function useGetUsuarios() {
	return useGet<Usuario[]>({
		key: 'useGetUsuarios',
		urlApi: `${URL_API}usuarios`,
		isEnabled: true,
		params: {},
	})
}

type useGetUsuarioProps = {
	id: string
	habilitado: boolean
}

export function useGetUsuario({ id, habilitado }: useGetUsuarioProps) {
	return useGet<UsuarioResponse>({
		key: 'useGetUsuario',
		urlApi: `${URL_API}usuarios/{id}`,
		isEnabled: habilitado,
		params: { id },
	})
}

export function usePostUsuario() {
	return usePost<UsuarioResponse, Error>({
		key: 'usePostUsuario',
		urlApi: `${URL_API}usuarios/`,
	})
}

export function usePutUsuario() {
	return usePut<UsuarioResponse, Error, {id: number}, UsuarioPutPayload>({
		key: 'usePutUsuario',
		urlApi: `${URL_API}usuarios/{id}/`,
	});
}

type usePatchUsuarioProps = {
	queriesToInvalidate?: string[]
};

export function usePatchUsuario({queriesToInvalidate}: usePatchUsuarioProps) {
	return usePatch<UsuarioPostPayload>({
		key: 'usePatchUsuario',
		urlApi: `${URL_API}usuarios/{id}/`,
		queriesToInvalidate: queriesToInvalidate,
	});
}

export function useDeleteUsuario() {
	return useDelete({
		key: 'useDeleteUsuario',
		urlApi: `${URL_API}usuarios/{id}/`,
	});
}