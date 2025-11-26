import BotonBase from '@components/Botones/BotonBase'
import CampoFecha from '@components/Formularios/CampoFecha'
import { CampoInput } from '@components/Formularios/CampoInput'
import CampoPassword from '@components/Formularios/CampoPassword'
import { Formulario } from '@components/Formularios/Formulario'
import { SubmitHandler } from 'react-hook-form'
import { Rol } from '@globalTypes/rol'
import CampoCheckboxGroup from '@components/Formularios/CampoCheckBoxGroup'
import { UsuarioCreateForm } from '@globalTypes/usuario'

type FormularioUsuarioProps = {
	roles: Rol[]
	onSubmit: SubmitHandler<UsuarioCreateForm>
	handleCancelar: () => void
	isLoading?: boolean
}

export default function FormularioUsuario({
	roles,
	onSubmit,
	handleCancelar,
	isLoading = false,
}: FormularioUsuarioProps) {

	const valoresInicialesCreate: UsuarioCreateForm = {
		email: '',
		username: '',
		password: '',
		password2: '',
		first_name: '',
		last_name: '',
		legajo: '',
		fecha_nacimiento: '',
        celular: '',
		//...camposRoles,
        roles: [],
	}

	return (
		<Formulario onSubmit={onSubmit} valoresIniciales={valoresInicialesCreate}>
			<div className="flex flex-col flex-wrap justify-between gap-2 md:flex-row md:gap-0">
				<div className="flex w-full flex-col gap-4 md:w-[45%]">
					<h2 className="font-bold">Datos de la cuenta</h2>
					<CampoInput
						label="Correo"
						nombre="email"
						type="email"
						placeholder="Ingrese el correo electrónico"
						obligatorio
					/>
					<CampoInput
						label="Nombre de Usuario"
						nombre="username"
						placeholder="Ingrese el nombre de usuario"
						autoComplete="off"
						type="text"
						obligatorio
					/>
					<CampoPassword
						label="Contraseña"
						nombre="password"
						placeholder="Ingrese la contraseña"
						autoComplete="new-password"
						obligatorio
					/>
					<CampoPassword
						label="Confirme su Contraseña"
						nombre="password2"
						autoComplete="new-password"
						placeholder="Confirme la contraseña"
						obligatorio
					/>
				</div>
				<div className="flex w-full flex-col gap-4 md:w-[45%]">
					<h2 className="font-bold">Datos personales</h2>
					<CampoInput
						label="Nombres"
						nombre="first_name"
						placeholder="Ingrese el nombre"
						autoComplete="off"
						type="text"
						obligatorio
					/>
					<CampoInput
						label="Apellidos"
						nombre="last_name"
						type="text"
						placeholder="Ingrese el apellido"
						obligatorio
					/>
					<CampoInput
						label="Legajo"
						nombre="legajo"
						type="text"
						placeholder="Ingrese el legajo"
						obligatorio
					/>
					<CampoFecha
						nombre="fecha_nacimiento"
						label="Fecha de Nacimiento"
						placeholder="01/01/2000"
					/>
                    <CampoInput
						label="Celular"
						nombre="celular"
						placeholder="Ingrese el celular"
						autoComplete="off"
						type="text"
					/>
				</div>
			</div>

			<div className="flex flex-wrap gap-5">
				{roles &&
					roles.map((rol) => (
						<CampoCheckboxGroup
							key={`campo-rol-${rol.id}`}
							label={`Es ${rol.nombre}?`}
							nombre={"roles"}
							value={rol}
							keyField="id"
						/>
					))}
			</div>

			<div className="flex justify-between">
				<BotonBase variant="cancelar" type="button" onClick={handleCancelar} />
				<BotonBase variant="guardar" type="submit" isLoading={isLoading} />
			</div>
		</Formulario>
	)
}
