import { AxiosRequestConfig } from 'axios'
import { generarQueryKey } from '../lib/generarQueryKey'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import fetcher from '../lib/fetcher'
import useToken from '@hooks/useToken'

type UseGetProps<TData, TParams> = {
	key: string
	urlApi: string
	params?: TParams
	isEnabled?: boolean
	configAxios?: AxiosRequestConfig
}

export default function useGet<TData = unknown, TParams extends Record<string, any> = {}>({
	key,
	urlApi,
	params = {} as TParams,
	isEnabled = true,
	configAxios = {},
}: UseGetProps<TData, TParams>): UseQueryResult<TData, Error> {
	const queryKey = generarQueryKey(key, params)
	const token = useToken()

	return useQuery<TData, Error>({
		queryKey,
		queryFn: () =>
			fetcher<TData, TParams>({
				params,
				token,
				urlApi,
				configAxios,
			}),
		gcTime: 1000 * 60 * 60,
		enabled: isEnabled,
		refetchOnWindowFocus: false,
	})
}
