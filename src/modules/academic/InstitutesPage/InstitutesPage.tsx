import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Instituto from '@globalTypes/instituto'
import useGetInstitutos from '@apis/intitutos'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useNavigate } from 'react-router'
import Listado from '@components/Lista/Listado'
import FeedCard from '@components/Tarjetas/FeedCard'
import BotonDetalle from '@components/Botones/BotonDetalle'

export default function InstitutesPage() {
	const { data: institutos, isLoading: loading, error } = useGetInstitutos()
	const navigate = useNavigate()

	const handleVerDetalle = (id: number) => {
		console.log('Instituto a ver detalle id: ', id)
		navigate(`/academica/institutos/detalle/${id}`)
	}

	const columns: ColumnDef<Instituto>[] = [
		{
			accessorKey: 'nombre',
			header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
		},
		{
			accessorKey: 'codigo',
			header: ({ column }) => <TituloTabla column={column} titulo="Código" />,
		},
		{
			id: 'actions',
			header: 'Detalle',

			cell: ({ row }) => <AccionTabla onClick={() => handleVerDetalle(row.original.id)} />,
		},
	]

	const hadleAgregar = () => {
		navigate('/academica/institutos/agregar')
	}

	return (
		<PageBase titulo="Página de Instituto" subtitulo="Listado de Institutos">
			{loading && <ComponenteCarga />}
			{error && <p className="text-center text-red-500">{error.message}</p>}

			{institutos && institutos.length > 0 && (
				<div>
					<div className="hidden sm:block">
						<Tabla
							columnas={columns}
							data={institutos}
							habilitarBuscador={true}
							habilitarPaginado={true}
							funcionAgregado={hadleAgregar}
						/>
					</div>
					<div className="block sm:hidden">
						{institutos && (
							<Listado
								data={institutos}
								orderData={institutos}
								orderKey={(institutos) => institutos.codigo}
								dataRender={(institutos) => (
									<FeedCard
										titulo={institutos.nombre}
										descripcion={institutos.codigo}
										actions={
											<BotonDetalle
												onClick={() => handleVerDetalle(institutos.id)}
											/>
										}
									/>
								)}
								onClick={hadleAgregar}
								mensajeSinDatos="No hay institutos."
							/>
						)}
					</div>
				</div>
			)}

			{institutos && institutos.length === 0 && (
				<p className="text-center">No hay institutos</p>
			)}
		</PageBase>
	)
}
