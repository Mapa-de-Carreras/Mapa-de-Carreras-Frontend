import { IDesignacion } from "@globalTypes/designaciones";
import { URL_API } from "./constantes";
import  useGet  from "./hooks/useGet";
import { IPlanEstudio, IPlanEstudioDetalle } from "@globalTypes/planesestudio";

const DESIGNACIONES_KEY = "useGetDesignaciones";
export function useGetDesignaciones() {
  return useGet<IDesignacion[]>({
    key: `${DESIGNACIONES_KEY }`, 
    urlApi: `${URL_API}designaciones-docentes/`,

  });
}


const DESIGNACIONES_DETALLE_KEY = "useGetDesignacionesDetalle";
export function useGetDesignacionesDetalle(id: number) {
  return useGet<IDesignacion>({
    key: `${DESIGNACIONES_DETALLE_KEY}`, 
    urlApi: `${URL_API}designaciones-docentes/${id}/`,

  });
}