import { useState } from "react";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IDocumento, IDocumentoDetalle } from "@globalTypes/documentos";

const DOCUMENTOS_KEY = "useGetDocumentos";
const DOCUMENTO_KEY = "useGetDocumento";
export function useGetDocumentos() {
  return useGet<IDocumento[]>({
    key: `${DOCUMENTOS_KEY}`, 
    urlApi: `${URL_API}documentos/`,
  });
}
export function useGetDocumento(id: number) {
  return useGet<IDocumentoDetalle>({
    key: `${DOCUMENTO_KEY}-${id}`, 
    urlApi: `${URL_API}documentos/${id}/`,
  });
}


export function useDeleteDocumento() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteDocumento = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("access_token");
    console.log("Eliminando documento id: ",id);
      const res = await fetch(`${URL_API}documentos/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el documento");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { deleteDocumento, loading, error, success };
}