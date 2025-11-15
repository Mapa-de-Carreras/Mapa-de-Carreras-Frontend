import {IDocente} from '@globalTypes/docentes'; 
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';

const DETAIL_KEY_NAME = "useGetDocenteCarrera";

// --- GET (Detalle por ID) ---
export function useGetDocenteCarrera(id: number) {
    return useGet<IDocente[]>({ 
        key: DETAIL_KEY_NAME,
        urlApi: `${URL_API}docentes/carrera/${id}`,
        isEnabled: !!id, // Solo se ejecuta si hay ID
        params: { id },
    });
}