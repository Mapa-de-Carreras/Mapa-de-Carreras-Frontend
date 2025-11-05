import DegreeDetail from "@academic/DegreePage/DegreeDetail/DegreeDetail"
import DegreePage from "@academic/DegreePage/DegreePage"
import InstitutePage from "@academic/InstitutesPage/InstitutesPage"
import LogoutPage from "@users/LogoutPage/LogoutPage"
import NotificacionesPage from "@users/NotificacionesPage/NotificacionesPage"
import UserCreate from "@users/UserCreate/UserCreate"
import UserDetail from "@users/UserDetail/UserDetail"
import UserEdit from "@users/UserEdit/UserEdit"

export interface AppRoute {
	path: string
	menu: boolean
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
			{ path: 'usuarios', label: 'Usuarios', icon: "icon-[mdi--user-group]", component: LogoutPage, menu: true },
			{ path: 'usuarios/crear', component:  UserCreate, menu: false},
			{ path: 'usuarios/detalle', component:  UserDetail, menu: false},
			{ path: 'usuarios/editar', component:  UserEdit, menu: false},
			{ path: 'notificaciones', component:  NotificacionesPage, menu: false},
			{ path: 'roles', label: 'Roles', icon: "icon-[clarity--lock-solid]", menu: true },
		],
		menu: true,
	},
	{
		path: 'academica',
		label: 'Académica',
		icon: 'icon-[cil--institution]',
		children: [
			{ path: 'institutos', label: 'Institutos', icon: "icon-[cil--institution]", component: InstitutePage, menu: true },
			{ path: 'carreras', label: 'Carreras', icon: "icon-[icon-park-outline--degree-hat]", component: DegreePage, menu: true },
			{ path: 'carreras/detalle', component:  DegreeDetail, menu: false},
			{ path: 'asignaturas', label: 'Asignaturas', icon: "icon-[octicon--book-16]", menu: true },
			{ path: 'planes', label: 'Planes de Estudio', icon: "icon-[basil--document-outline]", menu: true },
		],
		menu: true,
	},
	{
		path: 'docentes',
		label: 'Docentes',
		icon: 'icon-[hugeicons--teacher]',
		children: [
			{ path: 'gestion', label: 'Gestionar Docentes', icon: "icon-[mdi--account-student]", menu: true },
			{ path: 'parametros', label: 'Parámetros de Régimen', icon: "icon-[material-symbols--rule]", menu: true },
		],
		menu: true
	},
	{
		path: 'designaciones',
		label: 'Designaciones',
		icon: 'icon-[material-symbols--pending-actions]',
		children: [{ path: 'gestion', label: 'Gestión', icon: "icon-[fluent--document-person-16-filled]", menu: true }],
		menu: true
	},
	{
		path: 'estadisticas',
		label: 'Estadísticas',
		icon: 'icon-[akar-icons--statistic-up]',
		children: [
			{ path: 'estadisticas', label: 'Estadísticas', icon: "icon-[akar-icons--statistic-up]", menu: true },
			{ path: 'reportes', label: 'Reportes', icon: "icon-[mdi--report-bar-stacked]", menu: true },
		],
		menu: true
	},
]