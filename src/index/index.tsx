import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@components/Providers/ThemeProvider'
import { AuthProvider } from '@components/Providers/AuthProvider'
import { BrowserRouter } from 'react-router'
import Router from './Router'
import './index.css'

const root = document.getElementById('root')

createRoot(root!).render(
	<BrowserRouter basename='/mapa2025'>
		<ThemeProvider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ThemeProvider>
	</BrowserRouter>
)
