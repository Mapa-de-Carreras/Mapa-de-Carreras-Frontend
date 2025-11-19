import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { InvalidateAndRefetchOptions, QueryKeyLike } from './types'

export default function useInvalidateAndRefetch() {
	const queryClient = useQueryClient()

	return async (
		queries: QueryKeyLike,
		{ shouldRefetch = true, updater = null }: InvalidateAndRefetchOptions = {}
	) => {
		const keysArray = Array.isArray(queries) ? queries : [queries]

		const queryKeys: QueryKey[] = keysArray.map((key) => (Array.isArray(key) ? key : [key]))

		if (updater) {
			queryKeys.forEach((queryKey) => {
				queryClient.setQueryData(queryKey, (oldData: unknown) => updater(oldData))
			})
		}

		await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })))

		if (shouldRefetch) {
			await Promise.all(queryKeys.map((queryKey) => queryClient.refetchQueries({ queryKey })))
		}
	}
}
