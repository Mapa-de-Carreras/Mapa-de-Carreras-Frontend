import { URL_API } from "./constantes";
import usePost from "./hooks/usePost";


export function useActivarNotificacion() {
    return usePost({
        key: 'usePostNotificacion',
        urlApi: `${URL_API}debug/ejecutar-notificaciones/`,
    });
}

export function useMateriaSinResponsable() {
    return usePost({
        key: 'usePostNotificacion',
        urlApi: `${URL_API}debug/materia-sin-responsable/`,
    });
}