import { createContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

type ThemeProviderState = {
	theme: Theme
	setTheme: (_theme: Theme) => void
	toggleTheme: () => void
}

const initialState: ThemeProviderState = {
	theme: 'light',
	setTheme: () => null,
	toggleTheme: () => {},
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
	children,
	defaultTheme = 'light',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setState] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme
	)

	useEffect(() => {
		const root = window.document.documentElement
		
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
		
		root.classList.add(systemTheme);
		setTheme(systemTheme);
	}, []);

	const setTheme = (theme: Theme) => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')
		root.classList.add(theme);
		setState(theme);
	};

	const toggleTheme = () => {
		if (theme.includes('dark')) {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	}

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme)
			setTheme(theme)
		},
		toggleTheme
	}

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	)
}
