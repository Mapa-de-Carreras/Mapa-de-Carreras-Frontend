import { URL_API } from "./constantes";
import { useGet } from "./hooks/useGet";
import { IPlanEstudio } from "@globalTypes/planesestudio";

const PLANES_KEY = "useGetPlanes";
export function useGetPlanes() {
  return useGet<IPlanEstudio[]>({
    key: `${PLANES_KEY}`, 
    urlApi: `${URL_API}planes/`,

  });
}