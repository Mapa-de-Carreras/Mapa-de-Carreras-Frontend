import {IDocente} from '@globalTypes/docentes'; 
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';

const DETAIL_KEY_NAME = "useGetDocenteCarrera";
const DOCENTE_DETALLE_KEY = "useGetDocenteDetalle";
const DOCENTES_KEY = "useGetDocentes";
// --- GET (Detalle por ID) ---
export function useGetDocenteCarrera(id: number) {
    return useGet<IDocente[]>({ 
        key: DETAIL_KEY_NAME,
        urlApi: `${URL_API}docentes/carrera/${id}`,
        isEnabled: !!id, // Solo se ejecuta si hay ID
        params: { id },
    });
}
// --- GET detalle de un docente (retorna objeto) ---
export function useGetDocenteDetalle(id: number) {
  return useGet<IDocente>({
    key: `${DOCENTE_DETALLE_KEY}-${id}`, 
    urlApi: `${URL_API}docentes/${id}/`,
    isEnabled: !!id,
    params: { id },
  });
}

export function useGetDocentes() {
  return useGet<IDocente[]>({
    key: `${DOCENTE_DETALLE_KEY}`, 
    urlApi: `${URL_API}docentes/`,

  });
}