import { URL_API } from './constantes'
import { useGet } from './generics'
import Asignatura from '@globalTypes/asignatura'

export default function useGetAsignaturas() {
	return useGet<Asignatura[]>({
		hookName: 'useGetAsignaturas',
		url: `${URL_API}asignaturas`,
		enabled: true,
	})
}
