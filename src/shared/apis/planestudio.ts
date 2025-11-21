import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IPlanEstudio, IPlanEstudioDetalle } from "@globalTypes/planesestudio";

const PLANES_KEY = "useGetPlanes";
export function useGetPlanes() {
  return useGet<IPlanEstudio[]>({
    key: `${PLANES_KEY}`, 
    urlApi: `${URL_API}planes/`,

  });
}

const PLAN_DETALLE_KEY = "useGetPlanDetalle";
export function useGetPlanDetalle(id: number) {
  return useGet<IPlanEstudioDetalle>({
    key: `${PLAN_DETALLE_KEY}`, 
    urlApi: `${URL_API}planes/${id}/`,

  });
}