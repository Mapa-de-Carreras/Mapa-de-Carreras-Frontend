import { useNavigate, useParams } from 'react-router'
import { useDeleteInstituto, useGetInstituto } from '@apis/intitutos'
import BotonBase from '@components/Botones/BotonBase'

import { DetailCard } from '@components/CardDetalles/DetailCard'

import PageBase from '@components/PageBase/PageBase'
import { useModal } from '@components/Providers/ModalProvider'

import Icon from '@components/const/icons'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

import ListarCarreras from '@academica/PaginaCarreras/components/ListarCarreras'
import { useGetCarrerasPorInstituto } from '@apis/carreras'

export default function DetallesInstituto() {
	const { showModal } = useModal()

	const handleClickModal = () => {
		showModal({
			title: 'Eliminar Instituto',
			description: '¿Está seguro que desea eliminar este instituto?',
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

	const { mutate: eliminarInstituto, loading: isDeleting } = useDeleteInstituto()

	const { id } = useParams<{ id: string }>()

	const { data: instituto, isLoading: loading, error } = useGetInstituto(Number(id))

	const navigate = useNavigate()

	const handlelClickEditar = () => {
		navigate(`/academica/institutos/editar/${id}`)
	}

	const handleClickEliminar = async () => {
		if (!instituto) return

		try {
			// 2. Aquí llamas a la función 'mutate'
			//    Le pasas el ID.
			await eliminarInstituto(instituto.id)

			// 3. Si 'await' NO falla, todo salió bien
			showModal({
				title: 'Éxito',
				description: 'La instituto se ha eliminado correctamente.',
				buttons: [
					{
						variant: 'aceptar',
						onClick: () => console.log('aceptar'),
					},
				],
			})
			navigate('/academica/institutos')
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
				],
			})
		}
	}

	const {data: carreras, isLoading: loadingCarreras, error: errorCarreras} = useGetCarrerasPorInstituto(Number(id))

	return (
		<PageBase>
			{loading || (isDeleting && <ComponenteCarga />)}

			{error && <p>Error al cargar el instituto: {error.message}</p>}

			{!loading && !error && !instituto && <p>Instituto no encontrado.</p>}

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
					<ListarCarreras carreras={carreras} loading={loadingCarreras} error={errorCarreras}/>
				</DetailCard>
			)}
		</PageBase>
	)
}
