import { URL_API } from "./constantes";
import useDelete from "./hooks/useDelete";
import useGet from "./hooks/useGet";
import { IPlanAsignatura } from "@globalTypes/planasignatura";

const PLANES_KEY = "useGetPlanesAsignatura";
export function useGetPlanesAsignatura() {
  return useGet<IPlanAsignatura[]>({
    key: `${PLANES_KEY}`, 
    urlApi: `${URL_API}plan-asignatura/`,

  });
}

const PLAN_DETALLE_KEY = "useGetPlanAsignaturaDetalle";
export function useGetPlanAsignaturaDetalle(
  id: number,
  options?: { isEnabled?: boolean }
) {
  return useGet<IPlanAsignatura>({
    key: `${PLAN_DETALLE_KEY}-${id}`, 
    urlApi: `${URL_API}plan-asignatura/${id}/`,
    isEnabled: (options?.isEnabled ?? true) && !isNaN(id) && id > 0,
  });
}

export function useDeletePlanAsignatura(id: number) {
  return useDelete({
    key: 'useDeletePlanAsignatura',
    urlApi: `${URL_API}plan-asignatura/${id}/`
  })
}