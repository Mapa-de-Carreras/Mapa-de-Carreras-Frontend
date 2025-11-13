import { useNavigate, useParams } from 'react-router'
import { useDeleteAsignatura, useGetAsignatura } from '@apis/asignaturas'
import BotonBase from '@components/Botones/BotonBase'

import { DetailCard } from '@components/CardDetalles/DetailCard'
import { DetailField } from '@components/CardDetalles/DetailField'

import PageBase from '@components/PageBase/PageBase'
import { useModal } from '@components/Providers/ModalProvider'

import Icon from '@components/const/icons'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { DetailList } from '@components/CardDetalles/DetailList'

export default function DetalleAsignatura() {
    const { showModal } = useModal()

    const handleClickModal = () => {
        showModal({
            title: 'Eliminar Asignatura',
            description: '¿Está seguro que desea eliminar este asignatura?',
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
        mutate: eliminarAsignatura, 
        loading: isDeleting 
    } = useDeleteAsignatura();

    const { id } = useParams<{ id: string }>()
    
    const { data: asignatura, isLoading: loading, error } = useGetAsignatura(Number(id))
    const navigate = useNavigate()

    const handlelClickEditar = () => {
        navigate(`/academica/asignaturas/editar/${id}`)
    }

    const handleClickEliminar = async () => {
        if (!asignatura) return; 

        try {
            // 2. Aquí llamas a la función 'mutate'
            //    Le pasas el ID.
            await eliminarAsignatura(asignatura.id);

            // 3. Si 'await' NO falla, todo salió bien
            showModal({
                title: 'Éxito',
                description: 'La asignatura se ha eliminado correctamente.',
                buttons: [
                    {
                        variant: 'aceptar',
                        onClick: () => console.log('aceptar'),
                    },
                ]
            });
            navigate('/academica/asignaturas');

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
            
            {error && <p>Error al cargar la asignatura: {error.message}</p>}

            {!loading && !error && !asignatura && (
                <p>Asignatura no encontrada.</p>
            )}
            
            {!loading && !error && asignatura && (
                <DetailCard
                    titulo={`${asignatura.nombre}`}
                    icono={<Icon type="instituosIcon" className="text-3xl" />}
                    descripcion={asignatura.codigo}
                    actions={
                        <>
                            <BotonBase variant="editar" onClick={handlelClickEditar} />
                            <BotonBase variant="eliminar" onClick={handleClickModal} />
                        </>
                    }
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="border rounded-lg p-4 flex flex-col gap-y-3">
                            <h3 className="text-lg font-semibold mb-2">Definición de la Asignatura</h3>
                            
                            <DetailField label="Tipo de Asignatura">
                                {asignatura.tipo_asignatura}
                            </DetailField>
                            
                            <DetailField label="Tipo de Duración">
                                {asignatura.tipo_duracion}
                            </DetailField>
                            
                            <DetailField label="Cuatrimestre">
                                {asignatura.cuatrimestre}
                            </DetailField>

                            <DetailField label="Estado">
                                {asignatura.activo ? 'Activa' : 'Inactiva'}
                            </DetailField>
                        </div>

                        <div className="border rounded-lg p-4 flex flex-col gap-y-3">
                            <h3 className="text-lg font-semibold mb-2">Carga Horaria</h3>
                            
                            <DetailField label="Horas Totales">
                                {asignatura.horas_totales}
                            </DetailField>

                            <DetailField label="Horas Semanales">
                                {asignatura.horas_semanales}
                            </DetailField>

                            <DetailField label="Horas de Teoría">
                                {asignatura.horas_teoria}
                            </DetailField>

                            <DetailField label="Horas de Práctica">
                                {asignatura.horas_practica}
                            </DetailField>
                        </div>
                    </div>


                    <div className="border rounded-lg p-4 mt-6">
                        <DetailList label="Equipo Docente">
                            {/* Aquí iría la lógica para listar profesores */}
                            <p className="text-gray-500 text-sm">
                                (Próximamente: listado de profesores asignados)
                            </p>
                        </DetailList>
                    </div>

                </DetailCard>
            )}

        </PageBase>
    )
}