import DegreePage from "@academic/DegreePage/DegreePage"
import InstitutePage from "@academic/InstitutesPage/InstitutesPage"
import LogoutPage from "@users/LogoutPage/LogoutPage"

export interface AppRoute {
	path: string
	label?: string
	icon?: string
	component?: React.ComponentType<any>
	children?: AppRoute[]
}

export const appRoutes: AppRoute[] = [
	{
		path: 'administracion',
		label: 'Administración',
		icon: 'icon-[eos-icons--admin-outlined]',
		children: [
			{ path: 'usuarios', label: 'Usuarios', icon: "icon-[mdi--user-group]", component: LogoutPage },
			{ path: 'roles', label: 'Roles', icon: "icon-[clarity--lock-solid]" },
		],
	},
	{
		path: 'academica',
		label: 'Académica',
		icon: 'icon-[cil--institution]',
		children: [
			{ path: 'institutos', label: 'Institutos', icon: "icon-[cil--institution]", component: InstitutePage },
			{ path: 'carreras', label: 'Carreras', icon: "icon-[icon-park-outline--degree-hat]", component: DegreePage },
			{ path: 'asignaturas', label: 'Asignaturas', icon: "icon-[octicon--book-16]" },
			{ path: 'planes', label: 'Planes de Estudio', icon: "icon-[basil--document-outline]" },
		],
	},
	{
		path: 'docentes',
		label: 'Docentes',
		icon: 'icon-[hugeicons--teacher]',
		children: [
			{ path: 'gestion', label: 'Gestionar Docentes', icon: "icon-[mdi--account-student]" },
			{ path: 'parametros', label: 'Parámetros de Régimen', icon: "icon-[material-symbols--rule]" },
		],
	},
	{
		path: 'designaciones',
		label: 'Designaciones',
		icon: 'icon-[material-symbols--pending-actions]',
		children: [{ path: 'gestion', label: 'Gestión', icon: "icon-[fluent--document-person-16-filled]" }],
	},
	{
		path: 'estadisticas',
		label: 'Estadísticas',
		icon: 'icon-[akar-icons--statistic-up]',
		children: [
			{ path: 'estadisticas', label: 'Estadísticas', icon: "icon-[akar-icons--statistic-up]" },
			{ path: 'reportes', label: 'Reportes', icon: "icon-[mdi--report-bar-stacked]" },
		],
	},
]