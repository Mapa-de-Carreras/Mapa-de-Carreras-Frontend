import {
	ColumnDef,
	SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	getPaginationRowModel,
} from "@tanstack/react-table"

import { Table } from "@components/ui/table"
import { useState } from "react"
import EncabezadoTabla from "./componentes/EncabezadoTabla"
import ColumnasTabla from "./componentes/ColumnasTabla"
import FilasTabla from "./componentes/FilasTabla"

interface TablaProps<TData, TValue> {
	columnas: ColumnDef<TData, TValue>[]
	data: TData[]
	habilitarBuscador?: boolean
	habilitarPaginado?: boolean
	columnasFijas?: boolean // Indica si las columnas tienen todas el mismo tamaño, si es false debe indicar el tamaño con size
}

export function Tabla<TData, TValue>(
	{
		columnas,
		data,
		habilitarBuscador = false,
		habilitarPaginado = false,
		columnasFijas = true,
	}: TablaProps<TData, TValue>
) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const tabla = useReactTable({
		data,
		columns: columnas,
		state: {
			sorting,
			globalFilter
		},
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: "includesString",
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		...(habilitarPaginado && { getPaginationRowModel: getPaginationRowModel() }),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="tabla overflow-hidden rounded-md bg-table-background text-table-foreground p-2 text-xl">
			<EncabezadoTabla
				tabla={tabla}
				habilitarBuscador={habilitarBuscador}
				habilitarPaginado={habilitarPaginado}
			/>
			<div className="tabla-container w-full">
				<ColumnasTabla tabla={tabla} columnas={columnas} columnasFijas={columnasFijas}/>
				<FilasTabla
					tabla={tabla}
					columnas={columnas}
					columnasFijas={columnasFijas}
				/>
			</div>
		</div>
	)
}

