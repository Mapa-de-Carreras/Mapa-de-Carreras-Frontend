import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import { URL_API } from '@apis/constantes'
import { useEffect, useState } from 'react'
import PantallaCarga from '@components/PantallaCarga/PantallaCarga'
import { useNavigate } from 'react-router'
import Listado from '@components/Lista/Listado'
import institutos from '@data/institutos'
import TarjetaCarrera from './TarjetaCarrera'

interface Carrera {
	id: number
	nombre: string
	codigo: string
	instituto: {
		id: number
		codigo: string
		nombre: string
	}
}

export default function DegreePage() {
	const [carreras, setCarreras] = useState<Carrera[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCarreras = async () => {
			const token = localStorage.getItem('access_token')
			if (!token) {
				console.error('Token no encontrado')
				return
			}

			try {
				setLoading(true)
				const response = await fetch(`${URL_API}carreras/`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.message || 'Error al obtener carreras')
				}

				const data = await response.json()
				console.log('Carreras obtenidas:', data)
				setCarreras(data)
			} catch (error) {
				console.error('Error al obtener las carreras:', error)
				setError('Error al obtener las carreras. Intente nuevamente.')
			} finally {
				setLoading(false)
			}
		}

		fetchCarreras()
	}, [])

	const handleVerDetalle = (id: number) => {
		console.log('Carrera a ver detalle id: ', id)
		navigate(`/academica/carreras/detalle/`, { state: { id } })
	}

	const columns: ColumnDef<Carrera>[] = [
		{
			accessorFn: (row) => row.instituto?.codigo || '—',
			id: 'instituto',
			header: ({ column }) => <TituloTabla column={column} titulo="Instituto" />,
			cell: ({ row }) => (
				<div className="text-center font-medium">{row.getValue('instituto')}</div>
			),
			size: 1,
		},
		{
			accessorKey: 'nombre',
			header: ({ column }) => <TituloTabla column={column} titulo="Carrera" />,
			cell: ({ row }) => (
				<div className="flex flex-wrap">
					{row.getValue('nombre')}
				</div>
			),
			size: 3,
		},
		{
			id: 'coordinador',
			header: ({ column }) => <TituloTabla column={column} titulo="Coordinador" />,
			cell: () => <span className="text-gray-600 italic">Pendiente de asignar</span>,
			size: 2,
		},
		{
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => <AccionTabla onClick={() => handleVerDetalle(row.original.id)} />,
			size: 1,
		},
	]

	return (
		<PageBase
			titulo="Página de Carreras"
			subtitulo="Listado de carreras ordenadas por instituto"
		>
			{loading && <PantallaCarga mensaje="Cargando carreras..." />}
			{error && <p className="text-center text-red-500">{error}</p>}
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
				{carreras && institutos && (
					<Listado
						data={carreras}
						orderData={institutos}
						orderKey={(instituto) => instituto.nombre}
						compareTo={(instituto, carrera) => true}
						dataRender={(carrera) => (
							<TarjetaCarrera key={carrera.codigo} carrera={carrera} />
						)}
						mensajeSinDatos="No hay carreras para este instituto."
					/>
				)}
			</div>
		</PageBase>
	)
}
