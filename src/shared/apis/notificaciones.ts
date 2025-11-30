import { URL_API } from "./constantes";
import useGet from './hooks/useGet';
import usePatch from './hooks/usePatch';
import { NotificacionesResponse } from '@globalTypes/notificaciones'; 

type UseGetNotificacionesProps = {
    leida?: boolean | null;
    page?: number;
    pageSize?: number;
    enabled?: boolean;
    refetch?: number | false;
};

export function useGetNotificaciones({ 
    leida = null, 
    page = 1, 
    pageSize = 10, 
    enabled = true,
    refetch = false
}: UseGetNotificacionesProps = {}) {
    
    let queryString = `?page=${page}&page_size=${pageSize}`;
    if (leida !== null) {
        queryString += `&leida=${leida}`;
    }

    const cacheParams = {
        page,
        pageSize,
        leida
    };

    return useGet<NotificacionesResponse>({
        key: 'NOTIFICACIONES_CACHE',
        urlApi: `${URL_API}mis-notificaciones/${queryString}`,
        isEnabled: enabled,
        params: cacheParams,
        refetchInterval: refetch
    });
}

export function useMarcarLeida() {
    return usePatch<void, Error, { id: number }>({ 
        key: 'useMarcarLeida',
        urlApi: `${URL_API}mis-notificaciones/{id}/leer/`, 
        queriesToInvalidate: ['NOTIFICACIONES_CACHE'], 
    });
}

export function usePosponerNotificacion() {
    return usePatch<void, Error, { id: number }>({
        key: 'usePosponerNotificacion',
        urlApi: `${URL_API}mis-notificaciones/{id}/posponer/`,
        queriesToInvalidate: ['NOTIFICACIONES_CACHE'],
    });
}

export function useArchivarNotificacion() {
    return usePatch<void, Error, { id: number }>({
        key: 'useArchivarNotificacion',
        urlApi: `${URL_API}mis-notificaciones/{id}/archivar/`,
        queriesToInvalidate: ['NOTIFICACIONES_CACHE'],
    });
}