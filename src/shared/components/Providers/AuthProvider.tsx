import { loginRequest } from '@services/auth/login'
import logoutRequest from '@services/auth/logout'
import { refreshRequest } from '@services/auth/refresh'
import { AuthContextType, User } from '@services/auth/types'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
	children: ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate();

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const id = localStorage.getItem('user_id')
				const is_staff = localStorage.getItem('is_staff')

				// Si no hay datos, no intentamos nada
				if (!id) {
					setLoading(false)
					return
				}

				// Intentamos refrescar el token
				await refreshRequest()

				// Si el refresh es exitoso, seteamos el usuario
				setUser({ id: Number(id), is_staff: is_staff === 'true' })
			} catch (err) {
				console.error('Error al refrescar el token al iniciar:', err)
				logoutRequest()
				localStorage.clear()
				setUser(null)
			} finally {
				setLoading(false)
			}
		}

		initializeAuth()
	}, [])

	useEffect(() => {
		if (!user) return

		const interval = setInterval(
			async () => {
				try {
					await refresh()
				} catch (err) {
					console.error('Error refrescando token automáticamente:', err)
				}
			},
			60000
		)

		return () => clearInterval(interval)
		// NO necesita el refresh como dependencia
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	const login = async (username: string, password: string, onError: (_error: Error) => void) => {
		try {
			const userData = await loginRequest(username, password)
			setUser(userData);
			const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
			localStorage.removeItem("redirectAfterLogin");
			navigate(redirectPath, { replace: true });
		} catch (err) {
			if (err instanceof Error) onError(new Error(err.message))
			else onError(new Error('Error inesperado en el inicio de sesión.'))
		}
	}

	const logout = async () => {
		logoutRequest()
		setUser(null)
	}

	const refresh = async () => {
		try {
			await refreshRequest()
		} catch (err) {
			console.error('Error refrescando token:', err)
			logout()
		}
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, refresh }}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
