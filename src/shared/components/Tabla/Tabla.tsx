import {
	ColumnDef,
	SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table'

import { useState } from 'react'
import EncabezadoTabla from './componentes/EncabezadoTabla'
import ColumnasTabla from './componentes/ColumnasTabla'
import FilasTabla from './componentes/FilasTabla'
import enhanceColumns from './componentes/enhanceColumns'

interface TablaProps<TData, TValue> {
	columnas: ColumnDef<TData, TValue>[]
	data: TData[]
	funcionAgregado?: () => void
	funcionFiltro?: () => void
	habilitarBuscador?: boolean
	habilitarPaginado?: boolean
	columnasFijas?: boolean // Indica si las columnas tienen todas el mismo tamaño, si es false debe indicar el tamaño con size
	handleAccion?: (_row: TData) => void
	funcionExportar?: () => void
}

export function Tabla<TData, TValue>({
	columnas,
	data,
	funcionAgregado,
	funcionFiltro,
	habilitarBuscador = false,
	habilitarPaginado = false,
	columnasFijas = true,
	handleAccion,
	funcionExportar,
}: TablaProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const tabla = useReactTable({
		data,
		columns: handleAccion ? enhanceColumns<TData, TValue>(columnas, { onActionClick: handleAccion, }) : columnas,
		state: {
			sorting,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: 'includesString',
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		...(habilitarPaginado && { getPaginationRowModel: getPaginationRowModel() }),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className="tabla bg-table-background text-table-foreground overflow-hidden rounded-md mt-4 p-2 text-xl border">
			<EncabezadoTabla
				tabla={tabla}
				funcionAgregado={funcionAgregado}
				funcionFiltro={funcionFiltro}
				funcionExportar={funcionExportar}
				habilitarBuscador={habilitarBuscador}
				habilitarPaginado={habilitarPaginado}
			/>
			<div className="tabla-container w-full">
				<ColumnasTabla tabla={tabla} columnas={columnas} columnasFijas={columnasFijas} />
				<FilasTabla tabla={tabla} columnas={columnas} columnasFijas={columnasFijas} />
			</div>
		</div>
	)
}
