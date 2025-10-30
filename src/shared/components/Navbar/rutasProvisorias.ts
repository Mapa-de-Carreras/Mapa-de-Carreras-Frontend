import { Route } from "./types";

export const rutas: Route[] = [
    {
        path: 'administracion',
        label: 'Administración',
        icon: 'icon-[eos-icons--admin-outlined]',
        children: [
            { path: 'usuarios', label: 'Usuarios' },
            { path: 'roles', label: 'Roles' },
        ],
    },
    {
        path: 'academica',
        label: 'Académica',
        icon: 'icon-[cil--institution]',
        children: [
            { path: 'institutos', label: 'Institutos' },
            { path: 'carreras', label: 'Carreras' },
            { path: 'asignaturas', label: 'Asignaturas' },
            { path: 'planes', label: 'Planes de Estudio' },
        ],
    },
    {
        path: 'docentes',
        label: 'Docentes',
        icon: 'icon-[hugeicons--teacher]',
        children: [
            { path: 'gestion', label: 'Gestionar Docentes' },
            { path: 'parametros', label: 'Parámetros de Régimen' },
        ],
    },
    {
        path: 'designaciones',
        label: 'Designaciones',
        icon: 'icon-[material-symbols--pending-actions]',
        children: [{ path: 'gestion', label: 'Gestión' }],
    },
    {
        path: 'estadisticas',
        label: 'Estadísticas',
        icon: 'icon-[akar-icons--statistic-up]',
        children: [
            { path: 'estadisticas', label: 'Estadísticas' },
            { path: 'reportes', label: 'Reportes' },
        ],
    },
]