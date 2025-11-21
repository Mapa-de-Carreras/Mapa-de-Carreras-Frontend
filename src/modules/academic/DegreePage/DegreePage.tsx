import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import { useNavigate } from 'react-router'
import Listado from '@components/Lista/Listado'


import useGetCarreras from '@apis/carreras'
import { GET_TYPE_CARRERAS } from '@globalTypes/carrera'
import BotonDetalle from '@components/Botones/BotonDetalle'
import FeedCard from '@components/Tarjetas/FeedCard'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

export default function DegreePage() {
    const navigate = useNavigate()

    const { data: carreras, isLoading: loadingCarreras, error: errorGetingCarreras } = useGetCarreras()

    const handleVerDetalle = (id: number) => {
		if (!id) return
        navigate(`/academica/carreras/detalle/${id}`)
    }

    const columns : ColumnDef<GET_TYPE_CARRERAS>[] = 
		[
            
            {
                accessorKey: 'nombre',
				accessorFn: (row) => `${row.nombre}`,
                header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
				size: 1000
            },
			{
				accessorKey: 'codigo',
				accessorFn: (row) => `${row.codigo}`,
                header: ({ column }) => <TituloTabla column={column} titulo="Codigo" />,
				size: 100,
				minSize: 100,
                maxSize: 100,
            },
            {
                id: 'actions',
                header: 'Acciones',
                cell: ({ row }) => <AccionTabla onClick={() => handleVerDetalle(row.original.id)} />,
                size: 80,
				minSize: 80,
                maxSize: 80,
            },
        ]

	function handleAgregar(): void {
		navigate("/academica/carreras/agregar")
	}

    return (
        <PageBase titulo="Carreras">
            
  
            {loadingCarreras && <ComponenteCarga/>}
            

            {errorGetingCarreras && <p className="text-center text-red-500">{errorGetingCarreras.message}</p>}
            {!loadingCarreras && !errorGetingCarreras && carreras && (
				<div>
					<div className="hidden sm:block"> 
						<Tabla
							columnas={columns}
							data={carreras} 
							habilitarBuscador
							habilitarPaginado
							funcionAgregado={handleAgregar}
						/>
					</div>
					<div className="block sm:hidden">
						<Listado
							data={carreras} 
							dataRender={(carrera) => (
								<FeedCard
									titulo={carrera.nombre}
									descripcion={carrera.codigo}
									actions={
										<BotonDetalle
											onClick={() => handleVerDetalle(carrera.id)}
										/>
									}
								/>
							)}
							onClick={handleAgregar}
						/>
					</div>				
				</div>
				)
			}
			
			{
				!carreras || carreras.length === 0 && (
					<p className="text-center text-gray-500">No se encontraron carreras.</p>
				)
			}

        </PageBase>
    )
}