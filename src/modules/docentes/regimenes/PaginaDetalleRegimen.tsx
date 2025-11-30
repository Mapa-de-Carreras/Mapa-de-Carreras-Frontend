import { useGetRegimen, usePatchRegimen } from '@apis/regimenes';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';
import PageBase from '@components/PageBase/PageBase';
import { Card, CardContent, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { useNavigate, useParams } from 'react-router';
import { useVentana } from '@components/Providers/VentanaProvider';
import BotonBase from '@components/Botones/BotonBase';
import MensajeError from '@components/Mensajes/MensajeError';
import useRol from '@hooks/useRol';

export default function PaginaDetalleRegimen() {
	// Permisos
	const esAdmin = useRol("Administrador");

	// Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana();
	const navigate = useNavigate();

	// Obtiene los datos del Regimen
	const { id } = useParams();
	const { data: regimen, isError, isLoading } = useGetRegimen({ id: id || '', habilitado: !!id });

	// Configuación para activar un regimen
	const { mutate: activarRegimen, isPending: isLoadingPatch } = usePatchRegimen({
		queriesToInvalidate: ['useGetRegimen']
	});

	const onConfirmActivar = () => {
		activarRegimen(
			{ params: { id: id! }, data: { activo: !regimen?.activo } },
			{
				onError: () =>
					abrirVentana({
						tipoVentana: 'error',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Error!',
						descripcion: `No se pudo modificar el régimen`,
					}),
				onSuccess: () =>
					abrirVentana({
						tipoVentana: 'exito',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Completado!',
						descripcion: `El régimen se modificó con éxito`,
					}),
			}
		);
	};

	const handleActivar = () => {
		abrirVentana({
			tipoVentana: 'form',
			cargando: isLoadingPatch,
			onClose: cerrarVentana,
			onConfirm: onConfirmActivar,
			icono: 'icon-[mingcute--power-fill]',
			titulo: `${regimen?.activo ? "Desactivar" : "Activar"} Régimen`,
			descripcion: `¿Está seguro que desea ${regimen?.activo ? "desactivar" : "activar"} el régimen?`,
		});
	};

	const handleEditar = () => {
		navigate(`/docentes/parametros/editar/${regimen?.id}`);
	};

    const DetalleItem = ({ label, body }: { label: string, body: string | number | undefined }) => (
        <div className="flex flex-col gap-1">
            <span className="font-bold text-sm text-gray-500">{label}</span>
            <span className="text-base font-medium">{body}</span>
        </div>
    );

	return (
		<PageBase volver>
			{isLoading ? (
				<ComponenteCarga />
			) : isError ? (
				<MensajeError titulo='Error del Servidor' descripcion='No se pudo obtener los datos del régimen' />
			) : (
				regimen && (
					<Card className="mt-2">
						<CardTitle className="flex flex-col items-center justify-center gap-2 pt-6">
							<span className="icon-[material-symbols--rule] text-6xl" />
							<h3 className="text-xl">{`${regimen.modalidad.nombre} - ${regimen.dedicacion.nombre}`}</h3>
							<div className='flex flex-col sm:flex-row w-full max-w-80 gap-2 px-2 justify-center'>
								{esAdmin && (
									<>
										<BotonBase
											onClick={handleActivar}
											variant="guardar"
											type="button"
											icono='icon-[mingcute--power-fill]'
										>
											{regimen.activo ? "Desactivar" : "Activar"}
										</BotonBase>
										<BotonBase
											onClick={handleEditar}
											variant="editar"
											type="button"
										/>
									</>
								)}
							</div>
						</CardTitle>
						<Separator className="my-4" />
						<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
							<DetalleItem label="Modalidad:" body={regimen.modalidad.nombre} />
							<DetalleItem label="Dedicación:" body={regimen.dedicacion.nombre} />
							<DetalleItem label="Horas Min. Frente a Alumnos:" body={regimen.horas_min_frente_alumnos} />
							<DetalleItem label="Horas Max. Frente a Alumnos:" body={regimen.horas_max_frente_alumnos} />
							<DetalleItem label="Horas Min. Anuales:" body={regimen.horas_min_anual} />
							<DetalleItem label="Horas Max. Anuales:" body={regimen.horas_max_anual} />
							<DetalleItem label="Máximo Asignaturas:" body={regimen.max_asignaturas} />
                            <DetalleItem label="Estado:" body={regimen.activo ? 'Activo' : 'Inactivo'} />
						</CardContent>
					</Card>
				)
			)}
		</PageBase>
	);
}