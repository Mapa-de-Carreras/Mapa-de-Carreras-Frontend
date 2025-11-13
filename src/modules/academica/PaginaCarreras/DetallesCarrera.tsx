import { useNavigate, useParams } from 'react-router'
import { useDeleteCarrera, useGetCarrera } from '@apis/carreras'
import BotonBase from '@components/Botones/BotonBase'

import { DetailCard } from '@components/CardDetalles/DetailCard'
import { DetailField } from '@components/CardDetalles/DetailField'

import PageBase from '@components/PageBase/PageBase'
import { useModal } from '@components/Providers/ModalProvider'

import Icon from '@components/const/icons'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { DetailList } from '@components/CardDetalles/DetailList'

export default function DetallesCarrera () {
    const { showModal } = useModal()

    const handleClickModal = () => {
        showModal({
            title: 'Eliminar Carrera',
            description: '¿Está seguro que desea eliminar este carrera?',
            buttons: [
                {
                    variant: 'eliminar',
                    onClick: handleClickEliminar,
                },
                {
                    variant: 'cancelar',
                    onClick: () => console.log('Cancelado'),
                },
            ],
        })
    }

    const { 
        mutate: eliminarCarrera, 
        loading: isDeleting 
    } = useDeleteCarrera();

    const { id } = useParams<{ id: string }>()
    
    const { data: carrera, isLoading: loading, error } = useGetCarrera(Number(id))
    const navigate = useNavigate()

    const handlelClickEditar = () => {
        navigate(`/academica/carreras/editar/${id}`)
    }

    const handleClickEliminar = async () => {
        if (!carrera) return; 

        try {
            // 2. Aquí llamas a la función 'mutate'
            //    Le pasas el ID.
            await eliminarCarrera(carrera.id);

            // 3. Si 'await' NO falla, todo salió bien
            showModal({
                title: 'Éxito',
                description: 'La carrera se ha eliminado correctamente.',
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => console.log('aceptar'),
                    },
                ]
            });
            navigate('/academica/carreras');

        } catch (error) {
            // 4. Si 'await' FALLA, el hook lanza un error
            //    y lo capturamos aquí.
            showModal({
                title: 'Error al Eliminar',
                description: (error as Error).message,
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => console.log('terminar'),
                    },
                ]
            });
        }
    }



    return (

        <PageBase>
            
            {loading || isDeleting && <ComponenteCarga/>}
            
            {error && <p>Error al cargar la carrera: {error.message}</p>}

            {!loading && !error && !carrera && (
                <p>Carrera no encontrada.</p>
            )}
            
            {!loading && !error && carrera && (
                <DetailCard
                    titulo={`${carrera.codigo}`}
                    icono={<Icon type="instituosIcon" className="text-3xl" />}
                    descripcion={carrera.nombre}
                    actions={
                        <>
                            <BotonBase variant="editar" onClick={handlelClickEditar} />
                            <BotonBase variant="eliminar" onClick={handleClickModal} />
                        </>
                    }
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="border rounded-lg p-4 flex flex-col gap-y-3">   
                            
                            <DetailField label="Nivel de Carrera">
                                {carrera.nivel}
                            </DetailField>
                            
                            <DetailField label="Instituto">
                                {carrera.instituto.codigo}
                            </DetailField>
                            
                            <DetailField label="Coordinador">
                                {carrera.coordinador_actual.nombre_completo}
                            </DetailField>

                            <DetailField label="Historico de Coordinadores">
                                {
                                    carrera.coordinadores_historial.map((coordinador) => (
                                        <div key={coordinador.id}>
                                            {coordinador.nombre_completo}
                                        </div>
                                    ))
                                }
                            </DetailField>

                        </div>

                        <div className="border rounded-lg p-4 flex flex-col gap-y-3">
                            <DetailField label="Planes de Estudio">
                                {
                                    carrera.planes.map((plan) => (
                                        <div key={plan.id}>
                                            {plan.fecha_inicio}
                                        </div>
                                    ))
                                }
                            </DetailField>
                        </div>
                    </div>


                    <div className="border rounded-lg p-4 mt-6">
                        <DetailList label="Equipo Docente">
                            {/* Aquí iría la lógica para listar profesores */}
                            <p className="text-gray-500 text-sm">
                                (Próximamente: plan de estudio y profesores)
                            </p>
                        </DetailList>
                    </div>
                </DetailCard>
            )}

        </PageBase>
    )
}