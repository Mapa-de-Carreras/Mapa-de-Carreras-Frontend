import { useGetUsuarios } from '@apis/usuarios'
import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { useNavigate } from 'react-router'
import { ColumnDef } from '@tanstack/react-table'
import { UsuarioListItem } from '@globalTypes/usuario'
import Listado from '@components/Lista/Listado'
import FeedCard from '@components/Tarjetas/FeedCard'
import BotonDetalle from '@components/Botones/BotonDetalle'
import MensajeError from '@components/Mensajes/MensajeError'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

export default function PaginaUsuarios() {
	const { data: usuarios, isLoading: isLoadingUsuarios, isError: isErrorUsuarios } = useGetUsuarios()
	const navigate = useNavigate();

	const columnas: ColumnDef<UsuarioListItem>[] = [
		{
			accessorFn: (row) => `${row.first_name} ${row.last_name}`,
			id:'Nombre Completo',
			header: 'Nombre Completo',
			size: 2
		},
		{
			accessorFn: (row) =>  row.roles.map((rol) => rol.nombre).join(', '),
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
		navigate(`/administracion/usuarios/detalle/${row.id}`, { state: { id: row.id } })
	}

	const handleAgregar = () => {
		navigate('/administracion/usuarios/crear')
	}

	return (
		<PageBase titulo="Listado de Usuarios" subtitulo="Usuarios ordenados por nombre">
			{isLoadingUsuarios ? (
				<ComponenteCarga />
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
							columnasFijas={false}
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
											usuario.roles.map((rol) => rol.nombre).join(',')
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
