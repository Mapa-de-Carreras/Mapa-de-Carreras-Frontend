import { useNavigate } from 'react-router'
import { Formulario } from '@components/Formularios/Formulario'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Button } from '@components/ui/button'
import PageBase from '@components/PageBase/PageBase'
import { usePostInstituto } from '@apis/intitutos'
import { useModal } from '@components/Providers/ModalProvider'
import { useEffect } from 'react'
import BotonBase from '@components/Botones/BotonBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import z from 'zod'

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
						variant: 'error',
						onClick: () => {},
					},
				],
			})
		}
	}, [isSuccess, isError, error, showModal, navigate])

	const handleSubmit = (data : UsuarioForm) => {
		mutate(data)
	}


/* 	const usuarioSchema = z.object({
	nombre: z.string().min(2, "Muy corto"),
	edad: z.coerce.number().min(18, "Debes ser mayor de edad"),
	}); */

	const usuarioSchema = z.object({
		nombre: z.string().min(1, { message: "Requerido" }),
		codigo: z.string().min(1, { message: "Requerido" }),
	});
	
	type UsuarioForm = z.infer<typeof usuarioSchema>;

	const datosIniciales = { 
		nombre: "", 
		codigo: "" 
	}

	return (
		<PageBase titulo="Agregar Nuevo Instituto">
			<div className="mb-4">
				<BotonBase variant="regresar" onClick={() => navigate(-1)} />
			</div>

			<div className="mx-auto max-w-lg">
				<Card className="shadow-lg">
					<Formulario<UsuarioForm>
					schema={usuarioSchema} 
					valoresIniciales={datosIniciales}
					onSubmit={(data) => {
						handleSubmit(data)}}
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
