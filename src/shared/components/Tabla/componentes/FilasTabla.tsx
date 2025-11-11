import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

type FilasTablaProps<TData, TValue> = {
	tabla: Table<TData>,
	columnas: ColumnDef<TData, TValue>[],
	columnasFijas: boolean // Indica si las columnas tienen todas el mismo tamaño, si es false debe indicar el tamaño con size
};

export default function FilasTabla<TData, TValue>({
	tabla, columnas, columnasFijas
}: FilasTablaProps<TData, TValue>) {
	const gridTemplateColumns = `${columnas.map(col => col.size).join('fr ')}fr`;

	return (
		<div className="tabla-body">
			{tabla.getRowModel().rows?.length ? (
				tabla.getRowModel().rows.map((row) => {return (
					<div
						key={row.id}
						data-state={row.getIsSelected() && "selected"}
						className="tabla-row grid gap-4 border-b border-gray-300"
            			style={{ gridTemplateColumns: columnasFijas ? `repeat(${columnas.length}, 1fr)` : gridTemplateColumns}}
					>
						{row.getVisibleCells().map((cell) => (
							<div
								key={cell.id}
								className="table-cell p-2"
							>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</div>
						))}
					</div>
				)})
			) : (
				<div className="">
					<div className="h-24 text-center">
						No hay resultados.
					</div>
				</div>
			)}
		</div>
	);
}