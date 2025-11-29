import useGet from "./hooks/useGet";
import { URL_API } from "./constantes";
import { 
    RespuestaEstadisticaDocentes, 
    HorasDocente, 
    DesignacionCarrera 
} from "../types/estadisticas";

// Claves base para React Query
const KEY_DEDICACION = "getDocentesPorDedicacion";
const KEY_MODALIDAD = "getDocentesPorModalidad";
const KEY_HORAS = "getHorasPorDocente";
const KEY_DESIGNACIONES = "getDesignacionesPorCarrera";

// Helper para generar claves únicas y evitar caché obsoleto
const getDynamicKey = (baseKey: string, filtros?: { carrera_id?: string }) => {
    if (filtros?.carrera_id) {
        return `${baseKey}-${filtros.carrera_id}`;
    }
    return `${baseKey}-todos`;
};

export function useGetDocentesPorDedicacion(filtros?: { carrera_id?: string }) {
    return useGet<RespuestaEstadisticaDocentes>({
        key: getDynamicKey(KEY_DEDICACION, filtros), 
        urlApi: `${URL_API}estadisticas/docentes/dedicacion/`,
        // CORRECCIÓN AQUÍ: Envolvemos 'filtros' en 'queryParams'
        params: { queryParams: filtros }, 
    });
}

export function useGetDocentesPorModalidad(filtros?: { carrera_id?: string }) {
    return useGet<RespuestaEstadisticaDocentes>({
        key: getDynamicKey(KEY_MODALIDAD, filtros),
        urlApi: `${URL_API}estadisticas/docentes/modalidad/`,
        params: { queryParams: filtros }, // CORRECCIÓN
    });
}

export function useGetHorasPorDocente(filtros?: { 
    carrera_id?: string; 
    dedicacion?: string; 
    modalidad?: string; 
    horas_min?: number; 
    horas_max?: number; 
}) {
    // Generamos una key compuesta para que refresque al cambiar cualquier filtro
    let key = getDynamicKey(KEY_HORAS, filtros);
    if (filtros?.horas_min) key += `-min${filtros.horas_min}`;
    if (filtros?.horas_max) key += `-max${filtros.horas_max}`;

    return useGet<HorasDocente[]>({
        key: key,
        urlApi: `${URL_API}estadisticas/docentes/horas/`,
        params: { queryParams: filtros }, // CORRECCIÓN
    });
}

export function useGetDesignacionesPorCarrera(filtros?: { 
    carrera_id?: string; 
    anio?: number;
    estado?: string;
}) {
    const key = getDynamicKey(KEY_DESIGNACIONES, filtros);
    return useGet<DesignacionCarrera[]>({
        key: key,
        urlApi: `${URL_API}estadisticas/designaciones/`,
        params: { queryParams: filtros }, // CORRECCIÓN
    });
}