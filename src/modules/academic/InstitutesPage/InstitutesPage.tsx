import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Instituto from '@globalTypes/instituto'
import { useMemo, useCallback } from 'react'
import useGetInstitutos  from '@apis/intitutos'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useNavigate } from 'react-router' 

export default function InstitutesPage() {

    const {data: institutos, loading, error} = useGetInstitutos()
    const navigate = useNavigate()

    const handleVerDetalle = useCallback((id: number) => {
        console.log('Instituto a ver detalle id: ', id)
		navigate(`/academica/institutos/detalle/${id}`)
    }, [navigate])

    const columns = useMemo<ColumnDef<Instituto>[]>(
		() => [
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
                header: 'Acciones',

                cell: ({ row }) => (
                    <AccionTabla onClick={() => handleVerDetalle(row.original.id)} />
                ),
            },
		],[handleVerDetalle]
	)

    return (
        <PageBase titulo="Página de Instituto" subtitulo="Listado de Institutos">
            {loading && <ComponenteCarga />}
            {error && <p className="text-center text-red-500">{error.message}</p>}
            {!loading && 
                !error && 
                (institutos ? (
                    <Tabla
                        columnas={columns}
                        data={institutos}
                        habilitarBuscador={true}
                        habilitarPaginado={true}
                    />
                    ):(
                        <p className="text-center text-gray-500">No se encontraron institutos.</p>
                    )     
                )  
            }
        </PageBase>
    )
}
