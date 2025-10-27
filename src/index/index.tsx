import { createRoot } from 'react-dom/client'
import Router from './Router'
import './index.css'
import { ThemeProvider } from '@components/Providers/ThemeProvider';

const root = document.getElementById('root');

createRoot(root!).render(
    <ThemeProvider>
        <Router />
    </ThemeProvider>
)