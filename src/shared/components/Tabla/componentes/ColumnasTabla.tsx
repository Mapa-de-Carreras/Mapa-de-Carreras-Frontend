import { TableHead, TableHeader, TableRow } from "@components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

type ColumnasTablaProps<TData> = {
    tabla: Table<TData>
};

export default function ColumnasTabla<TData>({ tabla }: ColumnasTablaProps<TData>) {
    return (
        <TableHeader className="tabla-columnas hidden sm:table-header-group">
            {tabla.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
        </TableHeader>
    );
}