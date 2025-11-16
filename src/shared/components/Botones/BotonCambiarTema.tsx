import { useTheme } from '@hooks/useTheme'
import BotonBase from './BotonBase'
import { Moon, Sun } from 'lucide-react'

type BotonCambiarTemaProps = {
	variant?: 'onlyIcon' | 'IconText'
}

export default function BotonCambiarTema({ variant = 'onlyIcon' }: BotonCambiarTemaProps) {
	const { theme, toggleTheme } = useTheme()

	return (
		<BotonBase className="cursor-pointer" onClick={toggleTheme}>
			{theme.includes('dark') ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {variant==='IconText' && (
                theme.includes("dark") ? "Claro" : "Oscuro"
            )}
		</BotonBase>
	)
}
