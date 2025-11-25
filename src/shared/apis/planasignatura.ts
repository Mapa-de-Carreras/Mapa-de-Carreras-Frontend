import { useState } from "react";
import { URL_API } from "./constantes";
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
export function useGetPlanAsignaturaDetalle(id: number) {
  return useGet<IPlanAsignatura>({
    key: `${PLAN_DETALLE_KEY}`, 
    urlApi: `${URL_API}plan-asignatura/${id}/`,

  });
}
