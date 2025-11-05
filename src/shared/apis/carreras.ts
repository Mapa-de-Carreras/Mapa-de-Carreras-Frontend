import { URL_API } from "./constantes";
import { useGet } from "./generics";

export default function useGetCarreras() {
    return useGet({
        hookName: "useGetCarreras",
        url: `${URL_API}institutos`,
        enabled: true,
    });
}