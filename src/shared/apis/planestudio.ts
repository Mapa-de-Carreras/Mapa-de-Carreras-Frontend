import { useState } from "react";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IPlanEstudio, IPlanEstudioDetalle } from "@globalTypes/planesestudio";
import useDelete from "./hooks/useDelete";
import usePost from "./hooks/usePost";
import usePatch from "./hooks/usePatch";

const PLANES_KEY = "useGetPlanes";
export function useGetPlanes() {
  return useGet<IPlanEstudio[]>({
    key: `${PLANES_KEY}`,
    urlApi: `${URL_API}planes/`,

  });
}

const PLAN_DETALLE_KEY = "useGetPlanDetalle";
export function useGetPlanDetalle(id: number) {
  return useGet<IPlanEstudioDetalle>({
    key: `${PLAN_DETALLE_KEY}`,
    urlApi: `${URL_API}planes/${id}/`,

  });
}

export function useDeletePlanEstudio(id: number) {
  return useDelete({
    key: 'useDeletePlanEstudio',
    urlApi: `${URL_API}planes/${id}/`
  })
}

// NUEVOS
export function usePostAsignarCorrelativa() {
  return usePost({
    key: 'usePostAsignarCorrelativa',
    urlApi: `${URL_API}planes/asignar-correlativa/`
  })

}
export function useDeleteCorrelativa() {
  return useDelete({
    key: 'useDeleteCorrelativa',
    urlApi: `${URL_API}planes/correlativas/{id}/`,
  });
}

export function usePostPlanAsignatura() {
  return usePost({
    key: 'usePostPlanAsignatura',
    urlApi: `${URL_API}plan-asignatura/`
  })
}

export function useDeletePlanAsignatura() {
  return useDelete({
    key: 'useDeletePlanAsignatura',
    urlApi: `${URL_API}plan-asignatura/{id}/`
  })
}

export function usePatchPlanVigencia() {
  return usePatch({
    key: 'usePatchPlanVigencia',
    urlApi: `${URL_API}planes/{id}/vigencia/`,
  })
}