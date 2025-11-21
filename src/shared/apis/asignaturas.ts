import { URL_API } from './constantes'
import Asignatura from '@globalTypes/asignatura'
import useGet  from './hooks/useGet'

export default function useGetAsignaturas() {
	return useGet<Asignatura[]>({
		key: 'useGetAsignaturas',
		urlApi: `${URL_API}asignaturas`,
		isEnabled: true,
		params: {},
	})
}
