import useAuth from "./useAuth";

type TipoRol = 'Usuario General' | 'Docente' | 'Coordinador' | 'Administrador';

export default function useRol(nombre: TipoRol): boolean {
    const { user } = useAuth();

    if (!user) return false;

    return user.roles.some((rol) => rol.nombre===nombre);
}