import { useModal } from '@components/Providers/ModalProvider'
import { useNavigate, useParams } from 'react-router'
import { usePutAsignatura, useGetAsignatura } from '@apis/asignaturas'
import BotonBase from '@components/Botones/BotonBase'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Formulario } from '@components/Formularios/Formulario'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { CampoSelect } from '@components/Formularios/CampoSelect'
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

export default function SubjectEdit() {
    const id = Number(useParams<{ id: string }>().id);
    const navigate = useNavigate()
    const { showModal } = useModal()
    const { data: asignatura, isLoading: isLoadingAsignatura, error: errorGetingAsignatura } = useGetAsignatura(id)
    const { mutate: editarAsignatura, isPending: isPendingAsignatura } = usePutAsignatura()

    const handleAgregarAsignatura = (formData: AsignaturaForm) => {
        showModal({
            isLoading: true,
            msg: 'Guardando Asignatura...',
        })

        if(asignatura?.codigo == formData.codigo &&
            asignatura?.cuatrimestre == formData.cuatrimestre &&
            asignatura?.tipo_asignatura == formData.tipo_asignatura &&
            asignatura?.tipo_duracion == formData.tipo_duracion &&
            asignatura?.nombre == formData.nombre
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
        }

        editarAsignatura(
            { data: formData,
            params: { id: id }},
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
        <PageBase titulo="Editar Asignatura">
            <div className="mb-4">
                <BotonBase variant="regresar" onClick={() => navigate(-1)} />
            </div>

            {isLoadingAsignatura && <ComponenteCarga/>}
            {errorGetingAsignatura && <p>Error: {errorGetingAsignatura.message}</p>}
            {!isLoadingAsignatura && !errorGetingAsignatura && asignatura && (
                <div className="mx-auto max-w-lg">
                    <Card className="shadow-lg">
                        <Formulario
                            schema={AsignaturaSchema}
                            valoresIniciales={
                                {
                                    nombre: asignatura.nombre,
                                    codigo: asignatura.codigo,
                                    cuatrimestre: asignatura.cuatrimestre,
                                    tipo_asignatura: asignatura.tipo_asignatura,
                                    tipo_duracion: asignatura.tipo_duracion,
                                }
                            }
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
                                    {isPendingAsignatura ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </CardFooter>
                        </Formulario>
                    </Card>
                </div>
            )}
        </PageBase>
    )
}
