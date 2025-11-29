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
	funcionExportar?: () => void
}

export default function EncabezadoTabla<TData>({
	tabla,
	habilitarBuscador,
	habilitarPaginado,
	funcionAgregado,
	funcionFiltro,
	funcionExportar,
}: EncabezadoTablaProps<TData>) {
	return (
		<div className="encabezado-tabla flex grow justify-between p-4 flex-row sm:flex-wrap sm:gap-2 md:gap-0 md:flex-nowrap">
			<div className="w-full flex gap-2">
				{funcionAgregado && <BotonBase variant="agregar" onClick={funcionAgregado} />}
				{funcionExportar && <BotonBase variant='exportar' onClick={funcionExportar} />}
				{habilitarBuscador && <div className="flex-1 min-w-0"> <BuscadorTabla tabla={tabla} /></div>}
			</div>
			{habilitarPaginado && <div className="w-full"> <PaginadoTabla tabla={tabla} /></div>}
		</div>
	)
}
