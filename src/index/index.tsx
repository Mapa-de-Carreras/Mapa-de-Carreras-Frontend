import { createRoot } from 'react-dom/client'
import Router from './Router'
import './index.css'
import { ThemeProvider } from '@components/Providers/ThemeProvider'
import { AuthProvider } from '@components/Providers/AuthProvider'
import { ModalProvider } from '@components/Providers/ModalProvider'

const root = document.getElementById('root')

createRoot(root!).render(
	<ThemeProvider>
		<AuthProvider>
			<ModalProvider>
				<Router />
			</ModalProvider>
		</AuthProvider>
	</ThemeProvider>
)
