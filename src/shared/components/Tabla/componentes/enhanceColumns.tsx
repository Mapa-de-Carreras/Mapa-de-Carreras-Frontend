import { ColumnDef } from "@tanstack/react-table"
import TituloTabla from "../TituloTabla"
import AccionTabla from "../AccionTabla"

type EnhanceColumnsOptions<TData> = {
	onActionClick?: (_row: TData) => void
	actionsId?: string
}

export default function enhanceColumns<TData, TValue>(
	columns: ColumnDef<TData, TValue>[],
	options: EnhanceColumnsOptions<TData> = {}
): ColumnDef<TData, TValue>[] {
	const actionsId = options.actionsId ?? 'actions'

	return columns.map((col) => {
		const next: ColumnDef<TData, TValue> = { ...col }

		if (typeof next.header === 'string') {
			const titulo = next.header
			next.header = ({ column }) => <TituloTabla column={column} titulo={titulo} />
		}

		if (next.id === actionsId && options.onActionClick && !next.cell) {
			next.cell = ({ row }) => (
				<AccionTabla onClick={() => options.onActionClick?.(row.original)} />
			)
		}

		return next
	})
}
