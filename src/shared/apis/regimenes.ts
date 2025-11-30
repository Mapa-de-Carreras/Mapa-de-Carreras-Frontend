import { Regimen, RegimenPostPayload, RegimenPutPayload, RegimenResponse } from "@globalTypes/regimenes";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { ParamsBase } from "./hooks/types";
import usePost from "./hooks/usePost";
import usePut from "./hooks/usePut";
import useDelete from "./hooks/useDelete";
import usePatch from "./hooks/usePatch";

export default function useGetRegimenes() {
    return useGet<Regimen[]>({
        key: 'useGetRegimenes',
        urlApi: `${URL_API}parametros-regimen`,
    });
}

type useGetRegimenProps = {
    id?: string,
    habilitado: boolean,
}

export function useGetRegimen({ id, habilitado }: useGetRegimenProps) {
    return useGet<RegimenResponse, { id?: string }>({
        key: 'useGetRegimen',
        urlApi: `${URL_API}parametros-regimen/{id}`,
        isEnabled: habilitado,
        params: { id },
    })
}

export function usePostRegimen() {
    return usePost<RegimenResponse, Error, ParamsBase, RegimenPostPayload>({
        key: 'usePostRegimen',
        urlApi: `${URL_API}parametros-regimen/`,
        queriesToInvalidate: ["useGetRegimen"]
    })
}

export function usePutRegimen() {
    return usePut<RegimenResponse, Error, { id: string | number }, RegimenPutPayload>({
        key: 'usePutRegimen',
        urlApi: `${URL_API}parametros-regimen/{id}/`,
        queriesToInvalidate: ["useGetRegimen"]
    })
}

type useDeleteRegimenProps = {
    queriesToInvalidate: string[],
};

export function useDeleteRegimen({ queriesToInvalidate }: useDeleteRegimenProps) {
    return useDelete<RegimenResponse, Error, { id: string | number }>({
        key: 'useDeleteRegimen',
        urlApi: `${URL_API}parametros-regimen/{id}/`,
        queriesToInvalidate
    })
}

type usePatchRegimenProps = {
    queriesToInvalidate: string[],
};

export function usePatchRegimen({ queriesToInvalidate }: usePatchRegimenProps) {
    return usePatch<RegimenResponse, Error, { id: string | number }, Partial<RegimenPostPayload>>({
        key: 'usePatchRegimen',
        urlApi: `${URL_API}parametros-regimen/{id}/`,
        queriesToInvalidate
    })
}