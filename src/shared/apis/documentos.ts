import { useState } from "react";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IDocumento } from "@globalTypes/documentos";

const DOCUMENTOS_KEY = "useGetDocumentos";
const DOCUMENTO_KEY = "useGetDocumento";
export function useGetDocumentos() {
  return useGet<IDocumento[]>({
    key: `${DOCUMENTOS_KEY}`, 
    urlApi: `${URL_API}documentos/`,
  });
}
export function useGetDocumento() {
  return useGet<IDocumento>({
    key: `${DOCUMENTO_KEY}`, 
    urlApi: `${URL_API}documentos/2/`,
  });
}

