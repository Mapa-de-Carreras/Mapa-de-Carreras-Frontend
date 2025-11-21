import { URL_API } from './constantes'
import useGet from './hooks/useGet'
import { IModalidad } from '@globalTypes/modalidades'

export default function useGetModalidades() {
	return useGet<IModalidad[]>({
		key: 'useGetModalidades',
		urlApi: `${URL_API}modalidades`,
		isEnabled: true,
		params: {},
	})
}
