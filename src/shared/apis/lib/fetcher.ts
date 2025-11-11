import { AxiosRequestConfig } from 'axios'
import { api } from './client'
import urlConParametros from './urlConParametros'

type FetcherProps<TParams> = {
	params: TParams
	token: string
	urlApi: string
	configAxios?: AxiosRequestConfig
}

export default async function fetcher<TData, TParams>({
	params,
	token,
	urlApi,
	configAxios = {},
}: FetcherProps<TParams>): Promise<TData> {
	const authHeader = token ? { Authorization: `Bearer ${token}` } : {}
	const { headers: customHeaders = {}, responseType, ...otrosConfig } = configAxios

	const headers = {
		...authHeader,
		...customHeaders,
	}

	const finalUrl = params && urlApi ? urlConParametros(urlApi, params) : urlApi
	const queryParams = (params as any)?.queryParams ?? {}

	const response = await api.get<TData>(finalUrl, {
		params: queryParams,
		headers,
		responseType,
		...otrosConfig,
	})

	return response
}