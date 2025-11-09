import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { URL_API } from '@apis/constantes'

interface FetchState<T> {
	data: T[]
	loading: boolean
	error: string
}

/**
 * Hook personalizado para obtener datos de una API protegida.
 * Maneja el token, estados de carga, errores y redirección.
 * @param apiPath El path de la API a consultar (ej. 'asignaturas')
 */
export function useFetch<T>(apiPath: string): FetchState<T> {
	const [data, setData] = useState<T[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()

	useEffect(() => {

		if (!apiPath) return

		const fetchData = async () => {
			const token = localStorage.getItem('access_token')
			if (!token) {
				navigate('/login')
				return
			}

			try {
				setLoading(true)
				setError('')

				const request = await fetch(`${URL_API}${apiPath}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				const response = await request.json()

				if (!request.ok) {
					throw new Error(response.message || 'Error al obtener los datos')
				}

				setData(response)
			} catch (err) {
				const msg = err instanceof Error ? err.message : 'Ocurrió un error desconocido'
				console.error(`Error fetching ${apiPath}:`, msg)
				setError(msg)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [apiPath, navigate])

	return { data, loading, error }
}
