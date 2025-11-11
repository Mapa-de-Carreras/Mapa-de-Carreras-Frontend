export const generarQueryKey = (key: string, params: any = {}) => {
	const parametrosString = Object.fromEntries(
		Object.entries(params).filter(([_, valor]) => valor !== undefined && valor !== null)
	)

	if (Object.keys(parametrosString).length === 0) {
		return [key]
	}

	return [key, parametrosString]
}
