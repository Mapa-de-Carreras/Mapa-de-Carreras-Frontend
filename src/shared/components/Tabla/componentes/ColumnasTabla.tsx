import { ColumnDef, Table } from '@tanstack/react-table'

type ColumnasTablaProps<TData, TValue> = {
	tabla: Table<TData>,
	columnas: ColumnDef<TData, TValue>[],
	columnasFijas: boolean // Indica si las columnas tienen todas el mismo tamaño, si es false debe indicar el tamaño con size
}

export default function ColumnasTabla<TData, TValue>({ tabla, columnas, columnasFijas }: ColumnasTablaProps<TData, TValue>) {
	const gridTemplateColumns = `${columnas.map(col => col.size).join('fr ')}fr`;
	
	return (
		<div
			className='tabla-header grid gap-4 p-4 rounded-sm bg-table-header text-table-header-foreground font-semibold items-center'
			style={{ gridTemplateColumns: columnasFijas ? `repeat(${columnas.length}, 1fr)` : gridTemplateColumns}}
		>
			{tabla.getHeaderGroups().map((headerGroup) => (
				headerGroup.headers.map((header) => {
					return (
						<div key={`table-${header.id}`} className='tabla-fila flex'>
							{header.isPlaceholder ?
								null :
								typeof header.column.columnDef.header === 'function'
										? header.column.columnDef.header(header.getContext())
										: header.column.columnDef.header
							}
						</div>
					)
				})
			))}
		</div>
	)
}
