import { useParams, useNavigate } from 'react-router'
import { useGetInstituto, useDeleteInstituto } from '@apis/intitutos'
import BotonBase from '@components/Botones/BotonBase'
import { DetailCard } from '@components/CardDetalles/DetailCard'
import PageBase from '@components/PageBase/PageBase'
import { useModal } from '@components/Providers/ModalProvider'
import Icon from '@components/const/icons'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { useGetCarrerasPorInstituto } from '@apis/carreras'
import BotonDetalle from '@components/Botones/BotonDetalle'
import FeedCard from '@components/Tarjetas/FeedCard'
import { DetailList } from '@components/CardDetalles/DetailList'
import useRol from '@hooks/useRol'

export default function DetallesInstituto() {
	const { showModal } = useModal()
	const id = Number(useParams<{ id: string }>().id); 
	const navigate = useNavigate()

	const {data: instituto, isLoading: loadingInstituto, error: errorInstituto } = useGetInstituto(id)

	const { mutate: deleteInstituto } = useDeleteInstituto()

	const { data: carreras, isLoading: loadingCarreras, error: errorCarreras, } = useGetCarrerasPorInstituto(id)

	const isAdmin = useRol('Administrador')

    const handleConfirmDelete = () => {
        if (!id) return

        showModal({
            isLoading: true,
			msg: 'Eliminando Instituto...',
        })

        
        deleteInstituto(
            {
                params: { id: id },
            },
            {
                onSuccess: () => {
                   
                    showModal({
                        title: 'Éxito',
                        description: 'Instituto eliminado correctamente.',
                        isLoading: false,
                        buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
                    })
                },
                onError: (errorDeleting) => {
                    
                    showModal({
                        title: 'Error',
                        description: errorDeleting.message || 'No se pudo eliminar.',
                        isLoading: false, 
                        buttons: [{ variant: 'error', onClick: () => {} }],
                    })
                },
            }
        )
    }

    // 2. La función que ABRE la confirmación inicial
    const handleClickModal = () => {
        showModal({
            title: 'Eliminar Instituto',
            description: '¿Está seguro que desea eliminar este instituto?',
            buttons: [
                {
                    variant: 'eliminar',
                    autoClose: false, 
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
		navigate(`/academica/institutos/editar/${id}`)
	}

	function handleVerDetalle(id: number){
		navigate(`/academica/carreras/detalle/${id}`)
	}

	return (
		<PageBase titulo="Detalle" volver>

			{loadingInstituto && <ComponenteCarga mensaje="Cargando instituto..." />}
			{errorInstituto && <p>Error al cargar las instituto: {errorInstituto.message}</p>}

			{!loadingInstituto && !errorInstituto && instituto && (
				<DetailCard
					titulo={`${instituto.codigo}`}
					icono={<Icon type="instituosIcon" className="text-3xl" />}
					descripcion={instituto.nombre}
					actions={
						<>
							{
								isAdmin && (
									<BotonBase variant="editar" onClick={handlelClickEditar} />
								)
							}
							{
								isAdmin && (
									<BotonBase variant="eliminar" onClick={handleClickModal} />
								)
							}
						</>
					}
				>
					<DetailList label="Carreras" scrollable={true}>
						{loadingCarreras && <ComponenteCarga mensaje="Cargado carreras..." />}
						{errorCarreras && (
							<p>Error al cargar las carreras: {errorCarreras.message}</p>
						)}
						{!loadingCarreras &&
							!errorCarreras &&
							carreras &&
							(carreras.length > 0 ? (
								carreras.map((carrera) => (
									<FeedCard
										key={carrera.id}
										titulo={carrera.nombre}
										descripcion={carrera.codigo}
										actions={
											<BotonDetalle
												onClick={() => handleVerDetalle(carrera.id)}
											/>
										}
									/>
								))
							) : (
								<p className="text-sm text-gray-500">
									Este instituto no tiene carreras asociadas.
								</p>
							))}
					</DetailList>
				</DetailCard>
			)}
		</PageBase>
	)
}
