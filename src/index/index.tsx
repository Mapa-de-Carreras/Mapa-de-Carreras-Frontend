import { createRoot } from 'react-dom/client'
import Router from './Router'
import './index.css'
import { ThemeProvider } from '@components/Providers/ThemeProvider';
import { AuthProvider } from '@components/Providers/AuthProvider';

const root = document.getElementById('root');

createRoot(root!).render(
    <ThemeProvider>
        <AuthProvider>
            <Router />
        </AuthProvider>
    </ThemeProvider>
)