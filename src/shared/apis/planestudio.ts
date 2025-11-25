import { useState } from "react";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IPlanEstudio, IPlanEstudioDetalle } from "@globalTypes/planesestudio";
import useDelete from "./hooks/useDelete";

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

/*
export function useDeletePlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deletePlan = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("access_token");
    console.log("Eliminando plan id: ",id);
      const res = await fetch(`${URL_API}planes/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el plan");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { deletePlan, loading, error, success };
}
*/
export function useDeletePlanEstudio(id: number) {
  return useDelete({
    key: 'useDeletePlanEstudio',
    urlApi: `${URL_API}planes/${id}/`
  })
}