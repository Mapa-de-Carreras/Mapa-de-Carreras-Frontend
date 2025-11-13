import PageBase from '@components/PageBase/PageBase'
import ListaCarreras from './components/ListarCarreras'
import useGetCarreras from '@apis/carreras'

export default function PaginaAsignaturas() {
	const { data , isLoading, error } = useGetCarreras()
	return (
		<PageBase>
			<ListaCarreras carreras={data || []} loading={isLoading} error={error} />
		</PageBase>
	)
}
