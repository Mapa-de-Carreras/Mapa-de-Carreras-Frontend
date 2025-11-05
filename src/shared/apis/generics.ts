import { useEffect, useState } from 'react'

interface GetProps {
	url: string
	hookName: string
	enabled: boolean
	cacheTime?: number // ms - duración de la caché
}

type CacheEntry<Data> = {
	data: Data
	timestamp: number
}

// Caché en memoria (para no leer localStorage todo el tiempo)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryCache = new Map<string, CacheEntry<any>>()

export function useGet<Data>({ url, hookName, enabled, cacheTime = 5 * 60 * 1000 }: GetProps) {
	const [response, setResponse] = useState<Response | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<Error | null>(null)
	const [data, setData] = useState<Data | null>(null)

	const getCachedData = (): CacheEntry<Data> | null => {
		// 1️⃣ Revisar caché en memoria
		const mem = memoryCache.get(hookName)
		if (mem) return mem

		// 2️⃣ Revisar localStorage
		const local = localStorage.getItem(`useGet:${hookName}`)
		if (!local) return null

		try {
			const parsed = JSON.parse(local) as CacheEntry<Data>
			memoryCache.set(hookName, parsed) // lo guardamos también en memoria
			return parsed
		} catch {
			localStorage.removeItem(`useGet:${hookName}`)
			return null
		}
	}

	const saveToCache = (entry: CacheEntry<Data>) => {
		memoryCache.set(hookName, entry)
		localStorage.setItem(`useGet:${hookName}`, JSON.stringify(entry))
	}

	const fetchData = async (force = false) => {
		setLoading(true)
		setError(null)

		const now = Date.now()
		const cached = getCachedData()

		if (!force && cached && now - cached.timestamp < cacheTime) {
			setData(cached.data)
			setLoading(false)
			return
		}

		try {
			const token = localStorage.getItem("access_token");
			const options: RequestInit = {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
        			'Authorization': `Bearer ${token}`
				},
			};
			const res = await fetch(url, options)
			setResponse(res)

			if (!res.ok) throw new Error(`Request failed with status ${res.status}`)

			const json = (await res.json()) as Data
			setData(json)
			saveToCache({ data: json, timestamp: now })
		} catch (err: unknown) {
			setError(err instanceof Error ? err : new Error('Unknown error'))
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (enabled && url) fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled, url])

	return {
		response,
		data,
		loading,
		error,
		refetch: () => fetchData(true),
		clearCache: () => {
			memoryCache.delete(hookName)
			localStorage.removeItem(`useGet:${hookName}`)
		},
	}
}
