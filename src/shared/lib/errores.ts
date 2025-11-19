import type { AxiosError } from 'axios'

export function extraerMensajeDeError(error: AxiosError<any> | null | unknown) {
	if (!error || typeof error !== 'object') return 'Error inesperado'

	const axiosError = error as AxiosError<any>
	const data = axiosError.response?.data

	return JSON.stringify(data);

	//return data?.detail || data?.message || 'Ocurrió un error al procesar la solicitud'
}
