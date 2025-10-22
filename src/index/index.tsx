import { createRoot } from 'react-dom/client'
import Router from './Router'
import './index.css'

const root = document.getElementById('root');

createRoot(root!).render(
    <Router />
)