import { Table } from "@tanstack/react-table";
import PaginadoTabla from "./PaginadoTabla";
import BuscadorTabla from "./BuscadorTabla";

type EncabezadoTablaProps<TData> = {
    tabla: Table<TData>,
    habilitarBuscador: boolean,
    habilitarPaginado: boolean,
};

export default function EncabezadoTabla<TData>({
    tabla,
    habilitarBuscador,
    habilitarPaginado,
}: EncabezadoTablaProps<TData>) {
    return (
        <div className="encabezado-tabla flex flex-row justify-between p-4">
            {habilitarBuscador && (
                <BuscadorTabla tabla={tabla} />
            )}
            {habilitarPaginado && (
                <PaginadoTabla tabla={tabla} />
            )}
        </div>
    );
}