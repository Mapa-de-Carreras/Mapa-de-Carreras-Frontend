
import { Coordinador, CoordinadorPatchPayload, CoordinadorResponse } from "@globalTypes/coordinador";
import { URL_API } from "./constantes";
import usePatch from "./hooks/usePatch";
import useGet from "./hooks/useGet";

type useGetCoordinadorProps = {
    id?: string,
    habilitado: boolean
}

export function useGetCoordinador({id, habilitado}: useGetCoordinadorProps) {
    return useGet<CoordinadorResponse, { id?: string }>({
        key: 'useGetCoordinador',
        urlApi: `${URL_API}coordinadores/{id}`,
        isEnabled: habilitado,
        params: { id },
    })
}

export const useGetCoordinadoresDetalle = (
  coordinadorId: number,
  options?: { isEnabled?: boolean }
) => {
	return useGet<Coordinador>({
		key: "useGetCoordinadoresDetalle",
		urlApi: `${URL_API}coordinadores/${coordinadorId}/`,
		isEnabled: (options?.isEnabled ?? true) && !isNaN(coordinadorId),
	});
};

export function usePatchCoordinador() {
	return usePatch<CoordinadorPatchPayload, Error>({
		key: 'usePatchCoordinador',
		urlApi: `${URL_API}coordinadores/{id}`,
	})
}
