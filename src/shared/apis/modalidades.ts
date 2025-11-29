import { URL_API } from './constantes'
import { ParamsBase } from './hooks/types'
import useGet from './hooks/useGet'
import { ModalidadPostPayload, ModalidadPutPayload, ModalidadResponse } from '@globalTypes/modalidades'
import usePost from './hooks/usePost'
import usePut from './hooks/usePut'
import useDelete from './hooks/useDelete'

export default function useGetModalidades() {
	return useGet<ModalidadResponse[]>({
		key: 'useGetModalidades',
		urlApi: `${URL_API}modalidades`,
	})
}

type useGetModalidadProps = {
    id?: string,
    habilitado: boolean,
}

export function useGetModalidad({ id, habilitado }: useGetModalidadProps) {
	return useGet<ModalidadResponse, { id?: string }>({
		key: 'useGetModalidad',
		urlApi: `${URL_API}modalidades/{id}`,
		isEnabled: habilitado,
		params: { id },
	})
}

export function usePostModalidad() {
	return usePost<ModalidadResponse, Error, ParamsBase, ModalidadPostPayload>({
		key: 'usePostModalidad',
		urlApi: `${URL_API}modalidades/`,
		queriesToInvalidate: ["useGetModalidad"]
	})
}

export function usePutModalidad() {
	return usePut<ModalidadResponse, Error, { id: string | number }, ModalidadPutPayload>({
		key: 'usePutModalidad',
		urlApi: `${URL_API}modalidades/{id}/`,
		queriesToInvalidate: ["useGetModalidad"]
	})
}

type useDeleteModalidadProps = {
	queriesToInvalidate: string[],
};

export function useDeleteModalidad({ queriesToInvalidate }: useDeleteModalidadProps) {
	return useDelete<ModalidadResponse, Error, { id: string | number }>({
		key: 'useDeleteModalidad',
		urlApi: `${URL_API}modalidades/{id}/`,
		queriesToInvalidate
	})
}