import { useNavigate } from 'react-router'
import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Button } from '@components/ui/button'
import PageBase from '@components/PageBase/PageBase'
import { usePostInstituto } from '@apis/institutos'
import { useModal } from '@components/Providers/ModalProvider'
import { useEffect } from 'react'
import BotonBase from '@components/Botones/BotonBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'

export default function InstitutesAdd() {
	const navigate = useNavigate()
	const { showModal } = useModal()
	const { mutate, isPending, error, isSuccess, isError } = usePostInstituto()

	useEffect(() => {
		// Si la mutación (POST) tuvo ÉXITO
		if (isSuccess) {
			showModal({
				title: 'Éxito',
				description: 'El instituto se ha creado correctamente.',
				buttons: [
					{
						variant: 'aceptar',
						onClick: () => navigate(-1),
					},
				],
			})
		}

		// Si la mutación (POST) tuvo ERROR
		if (isError) {
			showModal({
				title: 'Error',
				description: error?.message || 'No se pudo crear el instituto.',
				buttons: [
					{
						variant: 'aceptar',
						onClick: () => {},
					},
				],
			})
		}
	}, [isSuccess, isError, error, showModal, navigate])

	const handleSubmit = (dataDelFormulario: { nombre: string; codigo: string }) => {
		mutate(dataDelFormulario)
	}

	return (
		<PageBase titulo="Agregar Nuevo Instituto">
			<div className="mx-auto max-w-lg">
				<Card className="shadow-lg">
					<Formulario
						onSubmit={handleSubmit}
						valoresIniciales={{ nombre: '', codigo: '' }}
					>
						<CardContent className="space-y-4 pt-6">
							<CampoInput label="Nombre del Instituto" nombre="nombre" />
							<CampoInput label="Código (Ej: IDEI)" nombre="codigo" />
						</CardContent>

						<CardFooter className="flex justify-between">
							<BotonBase variant="cancelar" onClick={() => navigate(-1)} />

							<Button type="submit" disabled={isPending}>
								{isPending ? 'Guardando...' : 'Crear Instituto'}
							</Button>
						</CardFooter>
					</Formulario>
				</Card>
			</div>
		</PageBase>
	)
}
