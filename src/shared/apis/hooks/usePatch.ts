import useToken from '@hooks/useToken'
import { GenericMutationVariables, ParamsBase } from './types'
import { UseMutationResult } from '@tanstack/react-query'
import { useGenericMutation, UseGenericMutationProps } from './useGenericMutation'

export type UsePatchProps<TData, TError, TParams extends ParamsBase, TBody, TContext> = Omit<
	UseGenericMutationProps<TData, TError, TParams, TBody, TContext>,
	'method' | 'token'
>

export default function usePatch<
	TData = unknown,
	TError = Error,
	TParams extends ParamsBase = ParamsBase,
	TBody = unknown,
	TContext = unknown,
>(
	options: UsePatchProps<TData, TError, TParams, TBody, TContext>
): UseMutationResult<TData, TError, GenericMutationVariables<TParams, TBody>, TContext> {
	const token = useToken()

	return useGenericMutation<TData, TError, TParams, TBody, TContext>({
		...options,
		method: 'PATCH',
		token,
	})
}
