import App from '@components/App/App'
import LoginPage from '@users/LoginPage/LoginPage'
import Home from './Home'
import ProtectedRoute from '@components/Providers/ProtectRouter'
import GuestRoute from '@components/Providers/GuestRoute'
import RouterMapa from '@components/Providers/RouterMapa'
import { Route } from '@globalTypes/route'
import RecoverUsername from '@users/RecoverUserName/RecoverUsername'
import RecoverPassword1 from '@users/RecoverPassword/RecoverPassword1'
import RecoverPassword2 from '@users/RecoverPassword/RecoverPassword2'
import RecoverPassword3 from '@users/RecoverPassword/RecoverPassword3'
import LogoutPage from '@users/LogoutPage/LogoutPage'
import UserCreate from '@users/UserCreate/UserCreate'
import UserDetail from '@users/UserDetail/UserDetail'
import UserEdit from '@users/UserEdit/UserEdit'
import NotificacionesPage from '@users/NotificacionesPage/NotificacionesPage'
import PaginaInstitutos from '@academica/PaginaInstitutos/PaginaInstitutos'
import DetallesAsignatura from '@academica/PaginaAsignaturas/DetallesAsignatura'
import PaginaAsignaturas from '@academica/PaginaAsignaturas/PaginaAsignaturas'
import DetallesInstituto from '@academica/PaginaInstitutos/DetallesInstituto'
import EditarAsignatura from '@academica/PaginaAsignaturas/EditarAsingatura'
import AgregarAsignatura from '@academica/PaginaAsignaturas/AgregarAsignatura'
import EditarInstituto from '@academica/PaginaInstitutos/EditarInstituto'
import AgregarInstituto from '@academica/PaginaInstitutos/AgregarInstituto'
import PaginaCarreras from '@academica/PaginaCarreras/PaginaCarreras'
import DetallesCarrera from '@academica/PaginaCarreras/DetallesCarrera'
import EditarCarrera from '@academica/PaginaCarreras/EditarCarrera'
import AgregarCarrera from '@academica/PaginaCarreras/AgregarCarrera'

export default function Router() {
	const rutas: Route[] = [
		{
			path: '/authentication',
			element: <GuestRoute />,
			children: [
				{ path: 'login', Component: LoginPage },
				{ path: 'reuser', Component: RecoverUsername },
				{ path: 'repass1', Component: RecoverPassword1 },
				{ path: 'repass2', Component: RecoverPassword2 },
				{ path: 'repass3', Component: RecoverPassword3 },
			],
		},
		{
			navbar: true,
			element: <ProtectedRoute />,
			children: [
				{
					path: '/',
					Component: App,
					children: [
						{
							index: true,
							Component: Home,
							menu: true,
							label: 'Home',
							icon: 'icon-[material-symbols--home]',
						},
						{
							path: 'administracion',
							label: 'Administración',
							icon: 'icon-[eos-icons--admin-outlined]',
							children: [
								{
									path: 'usuarios',
									label: 'Usuarios',
									icon: 'icon-[mdi--user-group]',
									Component: LogoutPage,
									menu: true,
								},
								{ path: 'usuarios/crear', Component: UserCreate, menu: false },
								{ path: 'usuarios/detalle', Component: UserDetail, menu: false },
								{ path: 'usuarios/editar', Component: UserEdit, menu: false },
								{
									path: 'notificaciones',
									Component: NotificacionesPage,
									menu: false,
								},
								{
									path: 'roles',
									label: 'Roles',
									icon: 'icon-[clarity--lock-solid]',
									menu: true,
								},
							],
							menu: true,
						},
						{
							path: 'academica',
							label: 'Académica',
							icon: 'icon-[cil--institution]',
							children: [
								{
									path: 'institutos',
									label: 'Institutos',
									icon: 'icon-[cil--institution]',
									Component: PaginaInstitutos,
									menu: true,
								},
								{
									path: 'institutos/detalle/:id',
									Component: DetallesInstituto,
									menu: false,
								},
								{
									path: 'institutos/editar/:id',
									Component: EditarInstituto,
									menu: false,
								},
								{
									path:'institutos/agregar',
									Component: AgregarInstituto,
									menu: false
								},
								{
									path: 'carreras',
									label: 'Carreras',
									icon: 'icon-[icon-park-outline--degree-hat]',
									Component: PaginaCarreras,
									menu: true,
								},
								{ 	path: 'carreras/detalle/:id', 
									Component: DetallesCarrera, 
									menu: false 
								},
								{
									path: 'carreras/editar/:id',
									Component: EditarCarrera,
									menu: false
								},
								{
									path:'carreras/agregar',
									Component: AgregarCarrera,
									menu: false
								},
								{
									path: 'asignaturas',
									label: 'Asignaturas',
									icon: 'icon-[octicon--book-16]',
									Component: PaginaAsignaturas,
									menu: true,
								},
								{
									path: 'asignaturas/detalle/:id',
									Component: DetallesAsignatura,
									menu: false,
								},
								{
									path: 'asignaturas/editar/:id',
									Component: EditarAsignatura,
									menu: false,
								},
								{
									path:'asignaturas/agregar',
									Component: AgregarAsignatura,
									menu: false
								},
								{
									path: 'planes',
									label: 'Planes de Estudio',
									icon: 'icon-[basil--document-outline]',
									menu: true,
								},
							],
							menu: true,
						},
						{
							path: 'docentes',
							label: 'Docentes',
							icon: 'icon-[hugeicons--teacher]',
							children: [
								{
									path: 'gestion',
									label: 'Gestionar Docentes',
									icon: 'icon-[mdi--account-student]',
									menu: true,
								},
								{
									path: 'parametros',
									label: 'Parámetros de Régimen',
									icon: 'icon-[material-symbols--rule]',
									menu: true,
								},
							],
							menu: true,
						},
						{
							path: 'designaciones',
							label: 'Designaciones',
							icon: 'icon-[material-symbols--pending-actions]',
							children: [
								{
									path: 'gestion',
									label: 'Gestión',
									icon: 'icon-[fluent--document-person-16-filled]',
									menu: true,
								},
							],
							menu: true,
						},
						{
							path: 'estadisticas',
							label: 'Estadísticas',
							icon: 'icon-[akar-icons--statistic-up]',
							children: [
								{
									path: 'estadisticas',
									label: 'Estadísticas',
									icon: 'icon-[akar-icons--statistic-up]',
									menu: true,
								},
								{
									path: 'reportes',
									label: 'Reportes',
									icon: 'icon-[mdi--report-bar-stacked]',
									menu: true,
								},
							],
							menu: true,
						},
					],
				},
			],
		},
		{ path: '*', element: <div>Error</div> },
	]

	return <RouterMapa rutas={rutas} />
}
