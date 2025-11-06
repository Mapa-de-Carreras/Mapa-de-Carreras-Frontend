import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Instituto from '@globalTypes/instituto'
import { useEffect, useState } from 'react'
import { URL_API } from '@apis/constantes'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useNavigate } from 'react-router'

export default function InstutesPage() {
    const [institutos, setInstitutos] = useState<Instituto[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchingInstitutos = async () => {
            const token = localStorage.getItem("access_token")//esto luego debería ser un get? si no hay token redirigir a login? 
            if (!token) {
                navigate('/login')
                return
            }

            try {
                setLoading(true)
                const request = await fetch(`${URL_API}institutos`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const response = await request.json()

                if (!request.ok) {
                    throw new Error(response.message)
                }

                setInstitutos(response)
            } catch (error) {
                console.log('ocurrio un error al obtener las institutos', error)
                setError('Ocurrio un error al obtener las institutos')
            } finally {
                setLoading(false)
            }
        }

        fetchingInstitutos()
    }, [navigate])

    const handleVerDetalle = (codigo: string) => {
        console.log('Instituo a ver detalle codigo: ', codigo)
    }

    const columns: ColumnDef<Instituto>[] = [
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
            {!loading && !error && institutos && (
                <Tabla
                    columnas={columns}
                    data={institutos}
                    habilitarBuscador={true}
                    habilitarPaginado={true}
                />
            )}
        </PageBase>
    )
}
