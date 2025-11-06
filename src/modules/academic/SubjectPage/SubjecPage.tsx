import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Asignatura from '@globalTypes/asignatura'
import { useEffect, useState } from 'react'
import { URL_API } from '@apis/constantes'
//import PantallaCarga from '@components/PantallaCarga/PantallaCarga'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useNavigate } from 'react-router'

export default function SubjectPage() {
	const [asignaturas, setAsignaturas] = useState<Asignatura[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchingAsignaturas = async () => {
			const token = localStorage.getItem("access_token")//esto luego debería ser un get? si no hay token redirigir a login? 
			if (!token) {
				navigate('/login')
				return
			}

			try {
				setLoading(true)
				const request = await fetch(`${URL_API}asignaturas`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				const response = await request.json()

				if (!request.ok) {
					throw new Error(response.message)
				}

				setAsignaturas(response)
			} catch (error) {
				console.log('ocurrio un error al obtener las asignaturas', error)
				setError('Ocurrio un error al obtener las asignaturas')
			} finally {
				setLoading(false)
			}
		}

		fetchingAsignaturas()
	}, [navigate])

	const handleVerDetalle = (codigo: string) => {
		console.log('Asignatura a ver detalle codigo: ', codigo)
	}

	const columns: ColumnDef<Asignatura>[] = [
		{
			accessorKey: 'nombre',
			header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
			cell: ({ row }) => (
				<div className="flex flex-wrap font-medium">{row.getValue('nombre')}</div>
			),
		},
		{
			accessorKey: 'codigo',
			header: ({ column }) => <TituloTabla column={column} titulo="Código" />,
		},
		{
			accessorKey: 'cuatrimestre',
			header: ({ column }) => <TituloTabla column={column} titulo="Cuatrimestre" />,
		},
		{
			accessorKey: 'tipo_duracion',
			header: ({ column }) => <TituloTabla column={column} titulo="Duración" />,
		},
		{
			accessorKey: 'tipo_asignatura',
			header: ({ column }) => <TituloTabla column={column} titulo="Tipo" />,
		},
		{
			accessorKey: 'horas_semanales',
			header: ({ column }) => <TituloTabla column={column} titulo="Hs. Semanales" />,
		},
		{
			accessorKey: 'horas_totales',
			header: ({ column }) => <TituloTabla column={column} titulo="Hs. Totales" />,
		},
		{
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => (
				<AccionTabla onClick={() => handleVerDetalle(row.original.codigo)} />
			),
		},
	]

	return (
		<PageBase titulo="Página de Asignaturas" subtitulo="Listado de Asignaturas">
			{loading && <ComponenteCarga />}
			{error && <p className="text-center text-red-500">{error}</p>}
			{!loading && !error && asignaturas && (
				<Tabla
					columnas={columns}
					data={asignaturas}
					habilitarBuscador={true}
					habilitarPaginado={true}
				/>
			)}
		</PageBase>
	)
}
