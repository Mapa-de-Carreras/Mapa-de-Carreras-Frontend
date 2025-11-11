import { useQueryClient } from '@tanstack/react-query'

export default function useInvalidateAndRefetch() {
	const queryClient = useQueryClient()

	return async (
		queries: string | Array<string>,
		{ shouldRefetch = true, updater = null } = {}
	) => {
		const keys = Array.isArray(queries) ? queries : [queries]
		const queryKeys = keys.map((key) => {
			const newKey = Array.isArray(key) ? key : [key]
			return newKey
		})
		await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })))
		if (shouldRefetch) {
			await Promise.all(queryKeys.map((queryKey) => queryClient.refetchQueries({ queryKey })))
		}
	}
}
