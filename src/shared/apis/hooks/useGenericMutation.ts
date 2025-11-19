import { AxiosRequestConfig } from 'axios'
import { GenericMutationVariables, HttpMethod, ParamsBase, QueryKeyLike, QueryParams } from './types'
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import useInvalidateAndRefetch from './useInvalidateAndRefetch'
import urlConParametros from '@apis/lib/urlConParametros'
import { api } from '@apis/lib/client'

export type UseGenericMutationBaseOptions<
	TData,
	TError,
	TParams extends ParamsBase,
	TBody,
	TContext,
> = {
	method?: HttpMethod
	key?: string
	urlApi: string
	params?: TParams
	data?: TBody
	token?: string | null
	contentType?: string
	queriesToInvalidate?: QueryKeyLike
	refetch?: boolean
	updater?: ((_oldData: unknown) => unknown) | null
	configAxios?: AxiosRequestConfig
	onSuccess?: (
		_data: TData,
		_variables: GenericMutationVariables<TParams, TBody>,
		_context: TContext | undefined
	) => void | Promise<void>
	onError?: (
		_error: TError,
		_variables: GenericMutationVariables<TParams, TBody>,
		_context: TContext | undefined
	) => void | Promise<void>
}

export type UseGenericMutationProps<
	TData,
	TError,
	TParams extends ParamsBase,
	TBody,
	TContext,
> = UseGenericMutationBaseOptions<TData, TError, TParams, TBody, TContext> &
	Omit<
		UseMutationOptions<TData, TError, GenericMutationVariables<TParams, TBody>, TContext>,
		'mutationFn' | 'onSuccess' | 'onError'
	>

export function useGenericMutation<
	TData = unknown,
	TError = Error,
	TParams extends ParamsBase = ParamsBase,
	TBody = unknown,
	TContext = unknown,
>(
	options: UseGenericMutationProps<TData, TError, TParams, TBody, TContext>
): UseMutationResult<TData, TError, GenericMutationVariables<TParams, TBody>, TContext> {
	const invalidateAndRefetch = useInvalidateAndRefetch()

	const {
		method = 'POST',
		urlApi,
		params,
		data,
		token = '',
		contentType = 'application/json',
		queriesToInvalidate = [],
		key = 'useGenericMutation',
		onSuccess,
		onError,
		refetch = false,
		updater = null,
		configAxios = {},
		...mutationOptions
	} = options

	return useMutation<TData, TError, GenericMutationVariables<TParams, TBody>, TContext>({
		mutationFn: async (
			variables: GenericMutationVariables<TParams, TBody> = {}
		): Promise<TData> => {
			const finalParams: TParams = {
				...(params || ({} as TParams)),
				...(variables.params as TParams | undefined),
			}

			const finalData: TBody | undefined =
				variables.data !== undefined ? variables.data : data

			const resolvedUrl = urlConParametros(urlApi, finalParams)

			const {
				headers: customHeaders = { 'Content-Type': contentType },
				responseType,
				...otrosConfig
			} = configAxios

			const headers = {
				Authorization: `Bearer ${token}`,
				...customHeaders,
			}

			
            const queryParams: QueryParams = finalParams.queryParams ?? {}

			try {
				let response

				switch (method.toUpperCase() as HttpMethod) {
					case 'POST':
						response = await api.post<TData>(resolvedUrl, finalData, {
							params: queryParams,
							headers,
							responseType,
							...otrosConfig,
						})
						break
					case 'PUT':
						response = await api.put<TData>(resolvedUrl, finalData, {
							params: queryParams,
							headers,
							responseType,
							...otrosConfig,
						})
						break
					case 'PATCH':
						response = await api.patch<TData>(resolvedUrl, finalData, {
							params: queryParams,
							headers,
							responseType,
							...otrosConfig,
						})
						break
					case 'DELETE':
						response = await api.delete<TData>(resolvedUrl, {
							params: queryParams,
							headers,
							responseType,
							...otrosConfig,
						})
						break
					default:
						throw new Error(`Método HTTP no soportado: ${method}`)
				}

				return response
			} catch (error) {
				console.error(`[${key}] Error en la mutación:`, error)
				throw error as TError
			}
		},

		onSuccess: async (datos, variables, context): Promise<void> => {
			if (Array.isArray(queriesToInvalidate) || typeof queriesToInvalidate === 'string') {
				const queries = Array.isArray(queriesToInvalidate)
					? queriesToInvalidate
					: [queriesToInvalidate]

				if (queries.length > 0) {
					try {
						await invalidateAndRefetch(queries, {
							shouldRefetch: refetch,
							updater,
						})
					} catch (e) {
						console.warn(`[${key}] Error al invalidar keys:`, e)
					}
				}
			}

			if (typeof onSuccess === 'function') {
				await onSuccess(datos, variables, context)
			}
		},

		onError,

		...mutationOptions,
	})
}
