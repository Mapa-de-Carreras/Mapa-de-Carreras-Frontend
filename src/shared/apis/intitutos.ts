import Instituto from '@globalTypes/instituto'
import { URL_API } from "./constantes";
import { useGet } from "./generics";

export default function useGetInstitutos() {

    return useGet<Instituto[]>({
        hookName: "useGetInstitutos",
        url: `${URL_API}institutos`,
        enabled: true,
    });
}

export function useGetInstituto(id: number){
    return useGet<Instituto>({
        hookName: `useGetInstituto:${id}`, 
        url: `${URL_API}institutos/${id}/`,
        enabled: !!id, 
    });
}