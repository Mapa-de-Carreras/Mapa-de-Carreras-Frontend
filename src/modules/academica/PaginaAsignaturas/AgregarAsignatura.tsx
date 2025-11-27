import { useModal } from '@components/Providers/ModalProvider'
import { useNavigate } from 'react-router'
import { usePostAsignatura } from '@apis/asignaturas'
import BotonBase from '@components/Botones/BotonBase'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Formulario } from '@components/Formularios/Formulario'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { CampoSelect } from '@components/Formularios/CampoSelectAntiguo'
import {
	AsignaturaForm,
	AsignaturaSchema,
	opcionesTipoAsignatura,
	opcionesTipoDuracion,
    opcionesCuatrimestre
} from './constraints'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import useRol from '@hooks/useRol'



const CamposLogicos = () => {
    const { watch, setValue } = useFormContext();
    const tipoDuracion = watch("tipoDuracion");
    const esAnual = tipoDuracion === 'ANUAL';
    useEffect(() => {
        if (esAnual) {
            setValue("cuatrimestre", "1"); 
        }
    }, [esAnual, setValue]);

    return (
        <>
            <CampoSelect
                label="Tipo de Duración"
                nombre="tipo_duracion"
                placeholder="Seleccione duración..."
                options={opcionesTipoDuracion}
            />

            <CampoSelect
                label="Cuatrimestre"
                nombre="cuatrimestre"
                placeholder="Seleccione cuatrimestre..."
                options={opcionesCuatrimestre}
                // 4. Aquí aplicamos la magia
                disabled={esAnual} 
            />
        </>
    );
};

export default function AgregarAsignatura() {
	const navigate = useNavigate()
	const { showModal } = useModal()
	const { mutate: agregarAsignatura, isPending: isPendingAsignatura } = usePostAsignatura()

	const isAdmin = useRol('Administrador')
	const isCoordinador = useRol('Coordinador')

	useEffect(() => {
		if (!isAdmin && !isCoordinador) {
			navigate('/'); 
		}
	}, [isAdmin, isCoordinador, navigate]);

	if (!isAdmin && !isCoordinador) return <ComponenteCarga />;

	const datosIniciales = {
		nombre: '',
		codigo: '',
		cuatrimestre: 1,
		tipo_asignatura: '',
		tipo_duracion: '',
	}

	const handleAgregarAsignatura = (data: AsignaturaForm) => {
		showModal({
			isLoading: true,
			msg: 'Guardando Asignatura...',
		})

		agregarAsignatura(
			{ data: data },
			{
				onSuccess: () => {
					showModal({
						title: 'Asignatura Agregada',
						description: 'La asignatura se ha agregado correctamente',
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
						description: errorPosting.message || 'No se pudo agregar la asignatura',
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

	return (
		<PageBase titulo="Agregar Nueva Asignatura" volver>

			<div className="mx-auto max-w-lg">
				<Card className="shadow-lg">
					<Formulario
						schema={AsignaturaSchema}
						valoresIniciales={datosIniciales}
						onSubmit={(data) => {
							handleAgregarAsignatura(data)
						}}
					>
						<CardContent className="space-y-4 pt-6">
							<CampoInput label="Nombre de Asignatura" nombre="nombre" />
							<CampoInput label="Código (Ej: MATE-101)" nombre="codigo" />
							<CampoSelect
								label="Tipo de Asignatura"
								nombre="tipo_asignatura"
								placeholder="Seleccione un tipo de asignatura..."
								options={opcionesTipoAsignatura}
							/>
                            <CamposLogicos/>
						</CardContent>

						<CardFooter className="flex justify-between">
							<BotonBase variant="cancelar" onClick={() => navigate(-1)} />

							<Button type="submit" disabled={isPendingAsignatura}>
								{isPendingAsignatura ? 'Guardando...' : 'Crear Asignatura'}
							</Button>
						</CardFooter>
					</Formulario>
				</Card>
			</div>
		</PageBase>
	)
}
