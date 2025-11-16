import BotonBase from '@components/Botones/BotonBase'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Formulario } from '@components/Formularios/Formulario'
import PageBase from '@components/PageBase/PageBase'
import { Card } from '@components/ui/card'
import useAuth from '@hooks/useAuth'
import { useState } from 'react'
import { Link } from 'react-router'
import LOGOBLANCO from '@assets/UNTDF png Blanco.png'
import LOGONORMAL from '@assets/UNTDF png Color.png'

import { useTheme } from '@hooks/useTheme'
import { Button } from '@components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import BotonCambiarTema from '@components/Botones/BotonCambiarTema'

type LoginForm = {
	username: string
	password: string
}

export default function PaginaIniciarSesion() {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const { login } = useAuth()
	const { theme } = useTheme()

	const valoresIniciales = {
		username: '',
		password: '',
	}

	const onError = (error: Error) => {
		setError(error.message)
	}

	const onSubmit = (data: LoginForm) => {
		const { username, password } = data
		login(username, password, onError)
	}

	return (
		<PageBase fondo>
			<div className="flex h-full w-full flex-row-reverse items-start">
				<Card className="h-130 sm:h-full w-full p-5 sm:w-100 sm:p-10">
                    <div className='flex flex-row justify-between items-start'>
					    <img className="w-60" src={theme.includes('dark') ? LOGOBLANCO : LOGONORMAL} />
                        <BotonCambiarTema />
                    </div>
					<Formulario onSubmit={onSubmit} valoresIniciales={valoresIniciales}>
						<CampoInput
							label="Nombre de usuario"
							nombre="username"
							type="text"
							placeholder="Ingrese su nombre de usuario"
							autoComplete="username"
							obligatorio
						/>
						<CampoInput
							label="Contraseña"
							nombre="password"
							type={showPassword ? "text" : "password"}
							placeholder="Ingrese su contraseña"
							autoComplete="current-password"
							obligatorio
							adorno={
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
							}
						/>
						<BotonBase className="w-full" type='submit'>
							Ingresar
						</BotonBase>
					</Formulario>
					{error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
					<div className="mt-4 flex flex-col gap-2 text-left text-sm">
						<Link to="/authentication/repass1">¿Olvidaste tu contraseña?</Link>
						<Link to="/authentication/reuser">¿Olvidaste tu nombre de usuario?</Link>
					</div>
				</Card>
			</div>
		</PageBase>
	)
}
