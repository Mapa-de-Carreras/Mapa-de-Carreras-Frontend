import { useGet } from "./generics";

export default function useGetCarreras() {
    return useGet({
        hookName: "useGetCarreras",
        url: "https://localhost:8000/carreras",
        enabled: true,
    });
}