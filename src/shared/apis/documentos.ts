import { useState } from "react";
import { URL_API } from "./constantes";
import useGet from "./hooks/useGet";
import { IDocumento } from "@globalTypes/documentos";

const DOCUMENTOS_KEY = "useGetDocumentos";
export function useGetDocumentos() {
  return useGet<IDocumento[]>({
    key: `${DOCUMENTOS_KEY}`, 
    urlApi: `${URL_API}documentos/`,
  });
}
