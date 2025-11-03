import { Button } from "@components/ui/button";
import { Table } from "@tanstack/react-table";

type PaginadoProps<TData> = {
    tabla: Table<TData>,
};

export default function Paginado<TData>({ tabla }: PaginadoProps<TData>) {
    return (
        <div className="flex items-center justify-end gap-2 text-xl">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => tabla.previousPage()}
                    disabled={!tabla.getCanPreviousPage()}
                >
                    <span className="icon-[fe--arrow-left]" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => tabla.nextPage()}
                    disabled={!tabla.getCanNextPage()}
                >
                     <span className="icon-[fe--arrow-right]" />
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <span>
                    <strong>
                        {tabla.getState().pagination.pageIndex + 1} de {tabla.getPageCount()}
                    </strong>
                </span>

                <select
                    value={tabla.getState().pagination.pageSize}
                    onChange={(e) => tabla.setPageSize(Number(e.target.value))}
                    className="border rounded px-2 py-1 cursor-pointer"
                >
                    {[5, 10, 20, 50].map((size) => (
                        <option className="bg-sidebar cursor-pointer" key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}