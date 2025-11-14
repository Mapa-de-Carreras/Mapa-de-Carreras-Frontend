import { useParams, useNavigate } from 'react-router' // 1. Importa useNavigate
import { useGetInstituto, useDeleteInstituto } from '@apis/institutos' // 2. Importa el hook de DELETE
import BotonBase from '@components/Botones/BotonBase'
import { DetailCard } from '@components/CardDetalles/DetailCard'
import { DetailField } from '@components/CardDetalles/DetailField'
import PageBase from '@components/PageBase/PageBase'
import { useModal } from '@components/Providers/ModalProvider'
import Icon from '@components/const/icons'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

export default function InstitutesDetail() {
    const { showModal } = useModal()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: instituto, isLoading: loading, error } = useGetInstituto(Number(id))
    
    const { mutate: deleteInstituto, isPending: isDeleting } = useDeleteInstituto()

    const handleConfirmDelete = () => {
        if (!id) return;
        deleteInstituto(Number(id), {
            onSuccess: () => {
                showModal({
                    title: '✅ Éxito',
                    description: 'Instituto eliminado correctamente.',
                    buttons: [
                        {
                            variant: 'aceptar',
                            onClick: () => navigate(-1), // Vuelve a la lista
                        },
                    ],
                })
            },
            onError: (err) => {
                // 5. ERROR: Muestra el modal de error (ej: 400 - "tiene carreras asociadas")
                showModal({
                    title: '❌ Error',
                    description: err.message || 'No se pudo eliminar el instituto.',
                    buttons: [
                        {
                            variant: 'cancelar',
                            onClick: () => {},
                        },
                    ],
                })
            },
        })
    }

    const handleClickModal = () => {
        showModal({
            title: 'Eliminar Instituto',
            description: '¿Está seguro que desea eliminar este instituto?',
            buttons: [
                {
                    variant: 'eliminar',
                    onClick: handleConfirmDelete,
                },
                {
                    variant: 'cancelar',
                    onClick: () => {},
                },
            ],
        })
    }

    const handlelClickEditar = () => {
        navigate(`/ruta/para/editar/${id}`)
    }

    return (
        <PageBase>
            
            {loading && isDeleting && <ComponenteCarga/>}
            
            {error && <p>Error al cargar el instituto: {error.message}</p>}

            {!loading && !error && !instituto && (
                <p>Instituto no encontrado.</p>
            )}
            
            {!loading && !error && instituto && (
                <DetailCard
        
                    titulo={`${instituto.codigo} - Detalles`}
                    icono={<Icon type="instituosIcon" className="text-3xl" />}
                    descripcion={instituto.nombre}
                    actions={
                        <>
                            {/* Deshabilita los botones si una operación de borrado está en curso */}
                            <BotonBase 
                                variant="editar" 
                                onClick={handlelClickEditar} 
                            />
                            <BotonBase 
                                variant="eliminar" 
                                onClick={handleClickModal} 
                            />
                        </>
                    }
                >
                    <DetailField label="otra cosa">
                        {instituto.activo ? 'Sí' : 'No'}
                    </DetailField>

                </DetailCard>
            )}
        </PageBase>
    )
}