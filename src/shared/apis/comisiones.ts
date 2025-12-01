import { URL_API } from "./constantes";
import useDelete from "./hooks/useDelete";
import  useGet  from "./hooks/useGet";
import { Comision } from "@globalTypes/comisiones";

export function useGetComisiones() {
	return useGet<Comision[]>({
		key: `useGetComisiones`, 
		urlApi: `${URL_API}comisiones/`,
	});
}

export function useGetComisionesDetalle(id: number | string) {
	return useGet<Comision>({
		key: `useGetComisionesDetalle`, 
		urlApi: `${URL_API}comisiones/{id}/`,
		params: { id }
	});
}

export function useDeleteComision(id: number | string) {
	return useDelete({
		key: 'useDeleteComision',
		urlApi: `${URL_API}comisiones/{id}/`,
		params: { id }
	})
}