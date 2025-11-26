import BotonBase from '@components/Botones/BotonBase'
import CampoFecha from '@components/Formularios/CampoFecha'
import { CampoInput } from '@components/Formularios/CampoInput'
import { Formulario } from '@components/Formularios/Formulario'
import { SubmitHandler } from 'react-hook-form'
import { UsuarioEditForm } from '@globalTypes/usuario'
import { Rol } from '@globalTypes/rol'
import CampoCheckboxGroup from '@components/Formularios/CampoCheckBoxGroup'
import { CampoSelect } from '@components/Formularios/CampoSelect'
import { GET_TYPE_CARRERAS_LIST } from '@globalTypes/carrera'

type FormularioEditarUsuarioProps = {
    onSubmit: SubmitHandler<UsuarioEditForm>
    handleCancelar: () => void
    isLoading?: boolean
    valoresIniciales?: UsuarioEditForm | null
    roles?: Rol[]
    carreras?: GET_TYPE_CARRERAS_LIST
}

export default function FormularioEditarUsuario({
    onSubmit,
    handleCancelar,
    isLoading = false,
    valoresIniciales = null,
    roles = [],
    carreras = [],
}: FormularioEditarUsuarioProps) {

    const valoresInicialesEdit: UsuarioEditForm = {
        legajo: '',
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        fecha_nacimiento: '',
        celular: '',
        roles: [],
    }

    return (
        <Formulario onSubmit={onSubmit} valoresIniciales={valoresIniciales || valoresInicialesEdit}>
            <div className="flex flex-col flex-wrap justify-between gap-2 md:flex-row md:gap-0">
                <div className="flex w-full flex-col gap-4 md:w-[45%]">
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
                    <CampoInput
						label="Legajo"
						nombre="legajo"
						type="text"
						placeholder="Ingrese el legajo"
						obligatorio
					/>
                    
                </div>
                <div className="flex w-full flex-col gap-4 md:w-[45%]">
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
            <CampoSelect
                className='w-full'
                label='Carrera a Coordinar'
                nombre='carreras'
                placeholder='Seleccione alguna Carrera'
                options={carreras.map(carrera => ({ value: carrera.id, label: carrera.nombre })
                )}
            />

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
