import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type QueryClientProviderProps = {
	children: ReactNode
}

export default function QueryProvider({ children }: QueryClientProviderProps) {
	const queryClient = new QueryClient()

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
