import { URL_API } from "./constantes";
import  useGet  from "./hooks/useGet";
import { IComision } from "@globalTypes/comisiones";

const COMISIONES_KEY = "useGetComisiones";
export function useGetComisiones() {
  return useGet<IComision[]>({
    key: `${COMISIONES_KEY }`, 
    urlApi: `${URL_API}comisiones/`,

  });
}


const COMSIONES_DETALLE_KEY = "useGetComisionesDetalle";
export function useGetComisionesDetalle(id: number) {
  return useGet<IComision>({
    key: `${COMSIONES_DETALLE_KEY}`, 
    urlApi: `${URL_API}comisiones/${id}/`,

  });
}
