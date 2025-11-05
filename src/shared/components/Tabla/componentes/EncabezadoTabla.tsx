import { Table } from '@tanstack/react-table'
import PaginadoTabla from './PaginadoTabla'
import BuscadorTabla from './BuscadorTabla'
import BotonBase from '@components/Botones/BotonBase'

type EncabezadoTablaProps<TData> = {
	tabla: Table<TData>
	habilitarBuscador: boolean
	habilitarPaginado: boolean
	funcionAgregado?: () => void
	funcionFiltro?: () => void
}

export default function EncabezadoTabla<TData>({
	tabla,
	habilitarBuscador,
	habilitarPaginado,
	funcionAgregado,
	funcionFiltro,
}: EncabezadoTablaProps<TData>) {
	return (
		<div className="encabezado-tabla flex grow justify-between p-4 flex-row">
			<div className="w-full flex gap-2">
				{funcionAgregado && <BotonBase variant="agregar" onClick={funcionAgregado} />}
				{habilitarBuscador && <BuscadorTabla tabla={tabla} />}
			</div>
			<div className="w-full">{habilitarPaginado && <PaginadoTabla tabla={tabla} />}</div>
		</div>
	)
}
