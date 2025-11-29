import { useGetUsuario } from '@apis/usuarios'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardTitle } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { useNavigate, useParams } from 'react-router'
import DetalleUsuario from '../PaginaDetalleUsuario/componentes/DetalleUsuario';
import MensajeError from '@components/Mensajes/MensajeError'
import { formatDate } from '@lib/fechas'
import BotonBase from '@components/Botones/BotonBase'

export default function PerfilUsuarioDetalle() {
	// Navegación
	const navigate = useNavigate();

	// Obtiene los datos del Usuario
	const { id } = useParams();
	const { data: usuario, isError, isLoading } = useGetUsuario({
		id: id || '',
		habilitado: !!id,
	});

    const handleEditar = () => {
        navigate(`/perfil/editar/${usuario?.id}`);
    };
	return (
		<PageBase volver>
			{isLoading ? (
				<ComponenteCarga />
			) : isError ? (
				<MensajeError
					titulo='Error del Servidor'
					descripcion='No se pudieron obtener los datos del usuario'
				/>
			) : (
				usuario && (
					<Card className="mt-2">
						<CardTitle className="flex flex-col items-center justify-center gap-2">
							<span className="icon-[guidance--user-1] text-6xl" />
							<h3 className="text-xl">{`${usuario.first_name} ${usuario.last_name}`}</h3>

							{/* 
							<div className='flex w-full max-w-80 px-2 justify-center'>
								<BotonBase
									onClick={handleEditar}
									variant="editar"
									type="button"
								/>
							</div>
                            */}

						</CardTitle>

						<Separator />

						<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<DetalleUsuario label="Nombres:" body={usuario.first_name} />
							<DetalleUsuario label="Apellidos:" body={usuario.last_name} />
							<DetalleUsuario label="Usuario:" body={usuario.username} />
							<DetalleUsuario label="Email:" body={usuario.email} />

							<DetalleUsuario
								label="Fecha de Nacimiento:"
								body={
									usuario.fecha_nacimiento
										? formatDate(new Date(usuario.fecha_nacimiento))
										: "Sin registros"
								}
							/>

							<DetalleUsuario label="Celular:" body={usuario.celular || 'Sin registros'} />
							<DetalleUsuario label="Legajo:" body={usuario.legajo || 'Sin registros'} />

							<DetalleUsuario
								label="Roles:"
								body={usuario.roles.map((r) => r.nombre).join(', ')}
							/>
						</CardContent>
					</Card>
				)
			)}
		</PageBase>
	);
}
