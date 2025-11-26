import { useState } from "react";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IDocumento, IDocumentoDetalle } from "@globalTypes/documentos";
import useDelete from "./hooks/useDelete";

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

export function useDeleteDocumento(id: number) {
  return useDelete({
    key: 'useDeleteDocumento',
    urlApi: `${URL_API}documentos/${id}/`
  })
}