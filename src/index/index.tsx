import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@components/Providers/ThemeProvider'
import { AuthProvider } from '@components/Providers/AuthProvider'
import { ModalProvider } from '@components/Providers/ModalProvider'
import { BrowserRouter } from 'react-router'
import Router from './Router'
import './index.css'
import QueryProvider from '@components/Providers/QueryProvider'
import VentanaProvider from '@components/Providers/VentanaProvider'

const root = document.getElementById('root')

createRoot(root!).render(
	<BrowserRouter basename="/mapa2025">
		<ThemeProvider>
			<AuthProvider>
				<QueryProvider>
					<VentanaProvider>
						<ModalProvider>
							<Router />
						</ModalProvider>
					</VentanaProvider>
				</QueryProvider>
			</AuthProvider>
		</ThemeProvider>
	</BrowserRouter>
)
