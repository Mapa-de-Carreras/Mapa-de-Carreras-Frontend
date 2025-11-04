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
	classNameFila?: string
	classNameCelda?: string
}

export function Tabla<TData, TValue>(
	{
		columnas,
		data,
		habilitarBuscador = false,
		habilitarPaginado = false,
		classNameFila = "",
		classNameCelda = "",
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
		<div className="tabla overflow-hidden rounded-md border">
			<EncabezadoTabla
				tabla={tabla}
				habilitarBuscador={habilitarBuscador}
				habilitarPaginado={habilitarPaginado}
			/>
			<Table className="text-sm">
				<ColumnasTabla tabla={tabla} />
				<FilasTabla
					tabla={tabla}
					columns={columnas}
					classNameFila={classNameFila}
					classNameCelda={classNameCelda}
				/>
			</Table>
		</div>
	)
}

