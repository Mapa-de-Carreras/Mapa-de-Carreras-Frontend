import { IDesignacion, POST_TYPE_DESIGNACION } from "@globalTypes/designaciones";
import { URL_API } from "./constantes";
import  useGet  from "./hooks/useGet";
import usePost from "./hooks/usePost";
import useDelete from "./hooks/useDelete";

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

export function usePostDesignacion() {
    return usePost<POST_TYPE_DESIGNACION >({
        key: 'usePostDesignacion',
        urlApi: `${URL_API}designaciones-docentes/`,
    });
}

export function useDeleteDesignacion(id: number) {
  return useDelete({
    key: 'useDeleteDesignacion',
    urlApi: `${URL_API}designaciones-docentes/${id}/`
  })
}