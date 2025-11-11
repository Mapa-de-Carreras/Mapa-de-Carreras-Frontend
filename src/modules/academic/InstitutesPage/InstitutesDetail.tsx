import { useParams } from 'react-router'
import { useGetInstituto } from '@apis/intitutos'
import BotonBase from '@components/Botones/BotonBase'

import { DetailCard } from '@components/CardDetalles/DetailCard'
import { DetailField } from '@components/CardDetalles/DetailField'

import PageBase from '@components/PageBase/PageBase'
import { useModal } from '@components/Providers/ModalProvider'

import Icon from '@components/const/icons'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

export default function InstitutesDetail() {
	const { showModal } = useModal()

    const handleClickModal = () => {
        showModal({
            title: 'Eliminar Instituto',
            description: '¿Está seguro que desea eliminar este instituto?',
            buttons: [
                {
                    variant: 'eliminar',
                    onClick: () => console.log('eliminar...'),
                },
                {
                    variant: 'cancelar',
                    onClick: () => console.log('Cancelado'),
                },
            ],
        })
    }

    const handlelClickEditar = () => {
        console.log('ir a editar')
    }

	const { id } = useParams<{ id: string }>()
    
	const { data: instituto, loading, error } = useGetInstituto(Number(id))

    return (
        <PageBase>
            
            {loading && <ComponenteCarga/>}
            
            {error && <p>Error al cargar el instituto: {error.message}</p>}
            
            {!loading && !error && instituto && (
                <DetailCard
        
                    titulo={`${instituto.codigo} - Detalles`}
                    icono={<Icon type="instituosIcon" className="text-3xl" />}
                    descripcion={instituto.nombre}
                    actions={
                        <>
                            <BotonBase variant="editar" onClick={handlelClickEditar} />
                            <BotonBase variant="eliminar" onClick={handleClickModal} />
                        </>
                    }
                >
                    <DetailField label="otra cosa">
                        {instituto.activo}
                    </DetailField>

                </DetailCard>
            )}

          
            {!loading && !error && !instituto && (
                <p>Instituto no encontrado.</p>
            )}
        </PageBase>
    )
}