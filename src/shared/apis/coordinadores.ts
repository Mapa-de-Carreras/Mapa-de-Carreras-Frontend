import { ICoordinador } from "@globalTypes/coordinador";
import { URL_API } from "./constantes";
import  useGet  from "./hooks/useGet";
import { IComision } from "@globalTypes/comisiones";

const COORDINADORES_KEY = "useGetCoordinadores";
export function useGetCoordinadores() {
  return useGet<ICoordinador[]>({
    key: `${COORDINADORES_KEY }`, 
    urlApi: `${URL_API}coordinadores/`,

  });
}


const COORDINADORES_DETALLE_KEY = "useGetCoordinadoresDetalle";
export function useGetCoordinadoresDetalle(id: number) {
  return useGet<ICoordinador>({
    key: `${COORDINADORES_DETALLE_KEY}`, 
    urlApi: `${URL_API}coordinadores/${id}/`,

  });
}
