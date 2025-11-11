import { RouterContext } from '@components/Providers/RouterMapa'
import { useContext } from 'react'

export default function useRoutes() {
	const context = useContext(RouterContext)

	if (!context) {
		throw new Error('useRoutes must be used within a RouterContext.Provider')
	}

	return context
}
