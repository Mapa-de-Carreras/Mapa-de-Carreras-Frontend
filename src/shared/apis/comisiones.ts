import { URL_API } from "./constantes";
import useDelete from "./hooks/useDelete";
import  useGet  from "./hooks/useGet";
import { Comision, ComisionPatchPayload, ComisionPostPayload } from "@globalTypes/comisiones";
import usePost from "./hooks/usePost";
import { ParamsBase } from "./hooks/types";
import usePatch from "./hooks/usePatch";

export function useGetComisiones() {
	return useGet<Comision[]>({
		key: `useGetComisiones`, 
		urlApi: `${URL_API}comisiones/`,
	});
}

export function useGetComisionesDetalle(id: number | string, habilitado?: boolean) {
	return useGet<Comision>({
		key: `useGetComisionesDetalle`, 
		urlApi: `${URL_API}comisiones/{id}/`,
		params: { id },
		isEnabled: habilitado === undefined ? true : habilitado,
	});
}

export function usePostComision() {
	return usePost<Comision, Error, ParamsBase, ComisionPostPayload>({
		key: 'usePostComision',
		urlApi: `${URL_API}comisiones/`,
		queriesToInvalidate: ["useGetComisiones"]
	})
}

export function usePatchComision() {
	return usePatch<Comision, Error, { id: string | number }, ComisionPatchPayload>({
		key: 'usePatchComision',
		urlApi: `${URL_API}comisiones/{id}/`,
		queriesToInvalidate: ["useGetComisiones"]
	})
}

export function useDeleteComision(id: number | string) {
	return useDelete({
		key: 'useDeleteComision',
		urlApi: `${URL_API}comisiones/{id}/`,
		params: { id }
	})
}