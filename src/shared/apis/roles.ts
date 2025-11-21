import { Rol } from "@globalTypes/rol";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";

export function useGetRoles() {
    return useGet<Rol[]>({
        key: 'useGetRoles',
        urlApi: `${URL_API}roles`,
        isEnabled: true,
    });
}