import { ICaracter } from '@globalTypes/caracter'
import { URL_API } from './constantes'
import { useGet } from './hooks/useGet'

export default function useGetCaracteres() {
    return useGet<ICaracter[]>({
        key: 'useGetCaracteres',
        urlApi: `${URL_API}caracteres`,
        isEnabled: true,
        params: {},
    })
}
