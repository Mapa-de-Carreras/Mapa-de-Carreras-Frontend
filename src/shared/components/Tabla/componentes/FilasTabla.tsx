import { TableBody, TableCell, TableRow } from "@components/ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

type FilasTablaProps<TData, TValue> = {
	tabla: Table<TData>,
	columns: ColumnDef<TData, TValue>[],
	classNameFila: string
	classNameCelda: string
};

export default function FilasTabla<TData, TValue>({
	tabla, columns, classNameCelda, classNameFila
}: FilasTablaProps<TData, TValue>) {
	return (
		<TableBody className="tabla-filas">
			{tabla.getRowModel().rows?.length ? (
				tabla.getRowModel().rows.map((row) => (
					<TableRow
						key={row.id}
						data-state={row.getIsSelected() && "selected"}
						className={classNameFila}
					>
						{row.getVisibleCells().map((cell) => (
							<TableCell
								key={cell.id}
								className={classNameCelda}
							>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</TableCell>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell
						colSpan={columns.length}
						className="h-24 text-center"
					>
						No results.
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
}