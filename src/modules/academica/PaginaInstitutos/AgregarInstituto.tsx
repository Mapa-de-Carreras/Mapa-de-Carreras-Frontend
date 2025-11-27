import { useNavigate } from 'react-router'
import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Button } from '@components/ui/button'
import PageBase from '@components/PageBase/PageBase'
import { usePostInstituto } from '@apis/intitutos'
import { useModal } from '@components/Providers/ModalProvider'
import BotonBase from '@components/Botones/BotonBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { InstitutoForm, InstitutoSchema } from './constraints'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import useRol from '@hooks/useRol'
import { useEffect } from 'react'

export default function AgregarInstituto() {
	const navigate = useNavigate()
	const { showModal } = useModal()
	const { mutate: crearIntituto, isPending: isPendingInsituto } = usePostInstituto()

	const isAdmin = useRol('Administrador')

	useEffect(() => {
		if (!isAdmin) {
			navigate('/')
		}
	}, [isAdmin, navigate])

	if (!isAdmin) return <ComponenteCarga />

	const handleSubmit = (data: InstitutoForm) => {
		showModal({
			isLoading: true,
			msg: 'Creando Instituto...',
		})

		crearIntituto(
			{ data: data },
			{
				onSuccess: () => {
					showModal({
						title: 'Éxito',
						description: 'El instituto se ha creado correctamente.',
						buttons: [
							{
								variant: 'aceptar',
								onClick: () => navigate(-1),
							},
						],
						isLoading: false,
					})
				},
				onError: (errorPosting) => {
					showModal({
						title: 'Error',
						description: errorPosting.message || 'No se pudo crear el instituto.',
						buttons: [
							{
								variant: 'error',
								onClick: () => {},
							},
						],
						isLoading: false,
					})
				},
			}
		)
	}

	const datosIniciales = {
		nombre: '',
		codigo: '',
	}

	return (
		<PageBase titulo="Agregar Nuevo Instituto" volver>

			<div className="mx-auto max-w-lg">
				<Card className="shadow-lg">
					<Formulario
						schema={InstitutoSchema}
						valoresIniciales={datosIniciales}
						onSubmit={(data) => {
							handleSubmit(data)
						}}
					>
						<CardContent className="space-y-4 pt-6">
							<CampoInput label="Nombre del Instituto" nombre="nombre" />
							<CampoInput label="Código (Ej: IDEI)" nombre="codigo" />
						</CardContent>

						<CardFooter className="flex justify-between">
							<BotonBase variant="cancelar" onClick={() => navigate(-1)} />

							<Button type="submit" disabled={isPendingInsituto}>
								{isPendingInsituto ? 'Guardando...' : 'Crear Instituto'}
							</Button>
						</CardFooter>
					</Formulario>
				</Card>
			</div>
		</PageBase>
	)
}
