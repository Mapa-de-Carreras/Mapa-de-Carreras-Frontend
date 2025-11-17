import { useGetUsuarios } from '@apis/usuarios'
import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { useNavigate } from 'react-router'
import { ColumnDef } from '@tanstack/react-table'
import { UsuarioListItem } from '@globalTypes/usuario'
import Listado from '@components/Lista/Listado'
import FeedCard from '@components/Tarjetas/FeedCard'
import BotonDetalle from '@components/Botones/BotonDetalle'
import useAuth from '@hooks/useAuth'
import { Loading } from '@components/Templates/Loading'
import MensajeError from '@components/Mensajes/MensajeError'

export default function PaginaUsuarios() {
	const { data: usuarios, isLoading: isLoadingUsuarios, isError: isErrorUsuarios } = useGetUsuarios()
	const { user } = useAuth()
	const navigate = useNavigate()

	const columnas: ColumnDef<UsuarioListItem>[] = [
		{ accessorKey: 'first_name', header: 'Nombre', size: 1 },
		{ accessorKey: 'last_name', header: 'Apellido', size: 1 },
		{
			accessorFn: (row) => (row.is_staff ? 'administrador' : '') + row.roles.join(','),
			id: 'roles',
			header: 'Roles',
			cell: ({ row }) => <div className="flex flex-wrap">{row.getValue('roles')}</div>,
			size: 2,
		},
		{
			accessorFn: (row) => (row.is_active ? 'Activo' : 'Inactivo'),
			id: 'is_active',
			header: 'Activo',
			size: 1,
		},
		{ id: 'actions', header: 'Acciones', size: 1 },
	]

	const handleVerDetalle = (row: UsuarioListItem) => {
		navigate(`/administracion/usuarios/detalle/`, { state: { id: row.id } })
	}

	const handleAgregar = () => {
		navigate('/administracion/usuarios/crear')
	}

	return (
		<PageBase titulo="Listado de Usuarios" subtitulo="Usuarios ordenados por nombre">
			{isLoadingUsuarios ? (
				<Loading
					titulo="Buscando Usuarios"
					descripcion="Esperando al servidor de la UNTDF..."
				/>
			) :  (isErrorUsuarios) ? (
                <MensajeError titulo='Error del Servidor' descripcion='No se pudo obtener los usuarios' />
            ) : (
				<>
					<div className="hidden sm:block">
						<Tabla
							data={usuarios || []}
							columnas={columnas}
							handleAccion={handleVerDetalle}
							habilitarBuscador
							funcionAgregado={handleAgregar}
						/>
					</div>
					<div className="block sm:hidden">
						{usuarios && (
							<Listado
								data={usuarios}
								dataRender={(usuario) => (
									<FeedCard
										key={usuario.id}
										titulo={`${usuario.first_name} ${usuario.last_name}`}
										descripcion={
											(usuario.is_staff ? 'administrador' : '') +
											usuario.roles.join(',')
										}
										actions={
											<BotonDetalle
												onClick={() => handleVerDetalle(usuario)}
											/>
										}
									/>
								)}
								onClick={handleAgregar}
							/>
						)}
					</div>
				</>
			)}
		</PageBase>
	)
}
