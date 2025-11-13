import Instituto from '@globalTypes/instituto'
import { URL_API } from "./constantes";
import { useGet } from './hooks/useGet';

export default function useGetInstitutos() {
    return useGet<Instituto[]>({
        key: "useGetInstitutos",
        urlApi: `${URL_API}institutos`,
        isEnabled: true,
        params: {},
    });
}

export function useGetInstituto(id: number){
    return useGet<Instituto>({
        key: "useGetInstituto",
        urlApi: `${URL_API}institutos/${id}/`,
        isEnabled: !!id,
        params: {},
    });
}