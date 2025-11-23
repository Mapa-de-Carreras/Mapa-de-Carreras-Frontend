import { useNavigate, useParams } from 'react-router'
import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'
import { CampoSelect } from '@components/Formularios/CampoSelect'
import { Button } from '@components/ui/button'
import PageBase from '@components/PageBase/PageBase'
import { usePutCarrera, useGetCarrera } from '@apis/carreras'
import { useModal } from '@components/Providers/ModalProvider'
import BotonBase from '@components/Botones/BotonBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { CarreraForm, CarreraSchema, opcionesNivel } from './constraints'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useGetInstitutos } from '@apis/intitutos'

export default function EditarCarrera() {
	// Truco para asegurar que es número
	const id = Number(useParams<{ id: string }>().id)
	const navigate = useNavigate()
	const { showModal } = useModal()

	const { data: carrera, isLoading: isLoadingCarrera, error: errorGeting } = useGetCarrera(id)
	const { mutate: actualizarCarrera, isPending: isPendingCarrera } = usePutCarrera()
	const { data: institutos, isLoading: loadingInstitutos } = useGetInstitutos()

	const handleSubmit = (formData: CarreraForm) => {
		showModal({
			isLoading: true,
			msg: 'Guardando cambios...',
			buttons: [],
		})

		if (
			carrera?.nombre == formData.nombre &&
			carrera?.nivel == formData.nivel &&
			carrera?.codigo == formData.codigo &&
			carrera?.instituto.id == Number(formData.instituto_id)
		) {
			showModal({
				title: 'Éxito',
				description: 'La carrera se ha actualizado correctamente.',
				buttons: [
					{
						variant: 'aceptar',
						onClick: () => navigate(-1),
					},
				],
				isLoading: false,
			})
            return
		}

		actualizarCarrera(
			{
				data: formData,
				params: { id: id },
			},
			{
				onSuccess: () => {
					showModal({
						title: 'Éxito',
						description: 'La carrera se ha actualizado correctamente.',
						isLoading: false,
						buttons: [
							{
								variant: 'aceptar',
								onClick: () => navigate(-1),
							},
						],
					})
				},
				onError: (errorPuting) => {
					showModal({
						title: 'Error',
						description: errorPuting.message || 'No se pudo actualizar la carrera.',
						isLoading: false,
						buttons: [
							{
								variant: 'error',
								onClick: () => {},
							},
						],
					})
				},
			}
		)
	}

	return (
		<PageBase titulo={'Editar Carrera'}>
			<div className="mb-4">
				<BotonBase variant="regresar" onClick={() => navigate(-1)} />
			</div>

			{(isLoadingCarrera || loadingInstitutos) && <ComponenteCarga />}
			{errorGeting && <div>{errorGeting.message}</div>}

			{!isLoadingCarrera && !loadingInstitutos && !errorGeting && institutos && carrera && (
				<div className="mx-auto max-w-lg">
					<Card className="shadow-lg">
						<Formulario
							onSubmit={handleSubmit}
							valoresIniciales={{
								codigo: carrera.codigo,
								nombre: carrera.nombre,
								nivel: carrera.nivel,
								instituto_id: carrera.instituto.id.toString(),
							}}
							schema={CarreraSchema}
						>
							<CardContent className="space-y-4 pt-6">
								<CampoInput label="Nombre de la Carrera" nombre="nombre" />
								<CampoInput label="Código (Ej: LS, TUP)" nombre="codigo" />

								<CampoSelect
									label="Nivel"
									nombre="nivel"
									placeholder="Seleccione un nivel..."
									options={opcionesNivel}
								/>

								<CampoSelect
									label="Instituto"
									nombre="instituto_id"
									placeholder="Seleccione un instituto..."
									disabled={loadingInstitutos}
									options={
										institutos.map((inst) => ({
											value: inst.id,
											label: inst.nombre,
										})) || []
									}
								/>
							</CardContent>

							<CardFooter className="flex justify-between">
								<BotonBase variant="cancelar" onClick={() => navigate(-1)} />

								<Button type="submit" disabled={isPendingCarrera}>
									{isPendingCarrera ? 'Guardando...' : 'Guardar Cambios'}
								</Button>
							</CardFooter>
						</Formulario>
					</Card>
				</div>
			)}
		</PageBase>
	)
}
