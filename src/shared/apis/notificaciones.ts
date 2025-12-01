import { URL_API } from "./constantes";
import useGet from './hooks/useGet';
import usePatch from './hooks/usePatch';
import { NotificacionesResponse } from '@globalTypes/notificaciones'; 

type UseGetNotificacionesProps = {
    params: {
        leida?: boolean | null;
        page?: number;
        pageSize?: number;
    }
    enabled?: boolean;
    refetch?: number | false;
};

export function useGetNotificaciones({
    params,
    enabled = true,
    refetch = false
}: UseGetNotificacionesProps) {

    return useGet<NotificacionesResponse>({
        key: 'NOTIFICACIONES_CACHE',
        urlApi: `${URL_API}mis-notificaciones/?page={page}&page_size={pageSize}&leida={leida}`,
        isEnabled: enabled,
        params,
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