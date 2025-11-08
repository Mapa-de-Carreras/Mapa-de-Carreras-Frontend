import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Instituto from '@globalTypes/instituto'
import { useMemo, useCallback } from 'react'
import useGetInstitutos  from '@apis/intitutos'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

export default function InstutesPage() {

    const {data: institutos, loading, error} = useGetInstitutos()

    const handleVerDetalle = useCallback((codigo: string) => {
        console.log('Instituo a ver detalle codigo: ', codigo)
    }, [])

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
                    <AccionTabla onClick={() => handleVerDetalle(row.original.codigo)} />
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
