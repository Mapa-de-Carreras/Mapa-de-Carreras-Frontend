import PageBase from '@components/PageBase/PageBase'
import carreras from '@data/carreras'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Carrera from '@globalTypes/carrera'
import TarjetaCarrera from './TarjetaCarrera'
import institutos from '@data/institutos'
import Listado from '@components/Lista/Listado'
import { useState } from 'react'

export default function DegreePage() {
    const [state, setState] = useState<object | null>(null);

	const columns: ColumnDef<Carrera>[] = [
		{
			accessorFn: (row) => row.instituto.titulo,
			id: 'instituto',
			header: ({ column }) => <TituloTabla column={column} titulo="Instituto" />,
			cell: ({ row }) => (
				<div className="text-center font-medium">{row.getValue('instituto')}</div>
			),
			size: 1,
		},
		{
			accessorKey: 'titulo',
			header: ({ column }) => <TituloTabla column={column} titulo="Carrera" />,
			cell: ({ row }) => <div className="flex flex-wrap">{row.getValue('titulo')}</div>,
			size: 3,
		},
		{
			accessorKey: 'coordinador',
			header: ({ column }) => <TituloTabla column={column} titulo="Coordinador" />,
			size: 2,
		},
		{
			id: 'actions',
			header: 'Acciones',
			cell: () => <AccionTabla onClick={() => {}} />,
			size: 1,
		},
	]

	return (
		<PageBase
			titulo="Página de Carreras"
			subtitulo="Listado de carreras ordenadas por instituto"
		>
			<div className="hidden sm:block">
				<Tabla
					columnas={columns}
					data={carreras}
					habilitarBuscador
					habilitarPaginado
					columnasFijas={false}
					funcionAgregado={() => {}}
				/>
			</div>
			<div className="block sm:hidden">
				<Listado
					data={carreras}
                    orderData={institutos}
                    orderKey={(instituto) => instituto.titulo}
                    compareTo={(instituto, carrera) => instituto.codigo===carrera.instituto.codigo}
					dataRender={(carrera) => (
						<TarjetaCarrera key={carrera.codigo} carrera={carrera} />
					)}
					mensajeSinDatos="No hay carreras para este instituto."
				/>
			</div>
		</PageBase>
	)
}
