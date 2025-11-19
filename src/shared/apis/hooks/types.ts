export type QueryKeyLike = string | readonly string[];

export type InvalidateAndRefetchOptions = {
	shouldRefetch?: boolean
	updater?: ((_oldData: unknown) => unknown) | null
}

export type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type GenericMutationVariables<TParams, TBody> = {
	params?: Partial<TParams>
	data?: TBody
}

export type QueryParams = Record<string, string | number | boolean | null | undefined>

export type ParamsBase = {
  queryParams?: QueryParams
} & Record<string, unknown>