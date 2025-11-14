import { useParams, useNavigate } from 'react-router' // 1. Importa useNavigate
import { useGetInstituto, useDeleteInstituto } from '@apis/intitutos' // 2. Importa el hook de DELETE
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


export default function InstitutesDetail() {
	const { showModal } = useModal()
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	const { data: instituto, isLoading: loading, error } = useGetInstituto(Number(id))

	const { mutate: deleteInstituto, isPending: isDeleting } = useDeleteInstituto()

	const { data: carreras, isLoading: loadingCarreras, error: errorCarreras } = useGetCarrerasPorInstituto(Number(id))

	const handleConfirmDelete = () => {
		if (!id) return
		deleteInstituto(Number(id), {
			onSuccess: () => {
				showModal({
					title: 'Éxito',
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
					title: 'Error',
					description: err.message || 'No se pudo eliminar el instituto.',
					buttons: [
						{
							variant: 'error',
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
		navigate(`/academica/institutos/editar/${id}`)
	}

	function handleVerDetalle(id: string | number): void {
		navigate(`/academica/carreras/detalle/${id}`)
	}

	return (
		<PageBase>
			<div className="mb-4">
				{' '} 
				<BotonBase
					variant="regresar"
					onClick={() => navigate(-1)}
				/>
			</div>

			{loading && isDeleting && <ComponenteCarga />}

			{error && <p>Error al cargar el instituto: {error.message}</p>}

			{!loading && !error && !instituto && <p>Instituto no encontrado.</p>}

			{!loading && !error && instituto && (
				<DetailCard
					titulo={`${instituto.codigo}`}
					icono={<Icon type="instituosIcon" className="text-3xl" />}
					descripcion={instituto.nombre}
					actions={
						<>
							<BotonBase variant="editar" onClick={handlelClickEditar} />
							<BotonBase variant="eliminar" onClick={handleClickModal} />
						</>
					}
				>

				<DetailList label="Carreras" scrollable={true}>
					{loadingCarreras && <ComponenteCarga />}
					{errorCarreras && <p>Error al cargar las carreras: {errorCarreras.message}</p>}
					{!loadingCarreras && !errorCarreras && carreras && (
							carreras.length > 0 ? (								
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
								<p className="text-sm text-gray-500">Este instituto no tiene carreras asociadas.</p>
							)
						)}
					</DetailList>
				</DetailCard>

			)}
		</PageBase>
	)
}
