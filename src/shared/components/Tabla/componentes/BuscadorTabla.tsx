import { Input } from "@components/ui/input";
import { Table } from "@tanstack/react-table";

type BuscadorTablaProps<TData> = {
    tabla: Table<TData>
};

export default function BuscadorTabla<TData>({ tabla }: BuscadorTablaProps<TData>) {
    return (
        <div className="flex items-center relative w-full">
            <span className="icon-[material-symbols--search] text-2xl absolute left-2" />
            <Input
                placeholder="¿Qué está buscando?"
                value={(tabla.getState().globalFilter as string) ?? ""}
                onChange={(event) => tabla.setGlobalFilter(event.target.value)}
                className="w-full pl-8"
            />
        </div>
    );
}