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
import DegreePage from '@academic/DegreePage/DegreePage'
import InstitutesPage from '@academic/InstitutesPage/InstitutesPage'
import DegreeDetail from '@academic/DegreePage/DegreeDetail'
import SubjectPage from '@academic/SubjectPage/SubjecPage'
import InstitutesDetail from '@academic/InstitutesPage/InstitutesDetail'
import PlanEstudioDetalle from '@academic/PlanDeEstudio/PlanEstudioDetalle'
import AsignaturaDetalle from '@academic/Asignaturas/AsignaturaDetalle'
import InstitutesAdd from '@academic/InstitutesPage/InstitutesAdd'
import InstitutesEdit from '@academic/InstitutesPage/InsitutesEdit'
import DegreeAdd from '@academic/DegreePage/DegreeAdd'
import DegreeEdit from '@academic/DegreePage/DegreeEdit'
import DocenteDetalle from '../modules/Docentes/DocenteDetalle'

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
						{ index: true, Component: Home, menu: true, label: "Home", icon: "icon-[material-symbols--home]" },
						{
							path: 'administracion',
							label: 'Administración',
							icon: 'icon-[eos-icons--admin-outlined]',
							children: [
								{ path: 'usuarios', label: 'Usuarios', icon: 'icon-[mdi--user-group]', Component: LogoutPage, menu: true, },
								{ path: 'usuarios/crear', Component: UserCreate, menu: false },
								{ path: 'usuarios/detalle', Component: UserDetail, menu: false },
								{ path: 'usuarios/editar', Component: UserEdit, menu: false },
								{ path: 'notificaciones', Component: NotificacionesPage, menu: false, },
								{ path: 'roles', label: 'Roles', icon: 'icon-[clarity--lock-solid]', menu: true, },
							],
							menu: true,
						},
						{
							path: 'academica',
							label: 'Académica',
							icon: 'icon-[cil--institution]',
							children: [
								{ path: 'institutos', label: 'Institutos', icon: 'icon-[cil--institution]', Component: InstitutesPage, menu: true, },
								{ path: 'institutos/detalle/:id', Component:  InstitutesDetail, menu: false},
								{path: 'institutos/agregar', Component: InstitutesAdd, menu: false},
								{path: 'institutos/editar/:id', Component: InstitutesEdit, menu: false},
								{ path: 'carreras', label: 'Carreras', icon: 'icon-[icon-park-outline--degree-hat]', Component: DegreePage, menu: true, },
								{ path: 'carreras/detalle/:id', Component: DegreeDetail, menu: false },
								{ path: 'carreras/agregar', Component: DegreeAdd, menu: false },
								{ path: 'carreras/editar/:id', Component: DegreeEdit, menu: false },
								{ path: 'asignaturas', label: 'Asignaturas', icon: 'icon-[octicon--book-16]', Component: SubjectPage, menu: true,},
								{ path: 'asignaturas/detalle', Component: AsignaturaDetalle, menu: false },
								{ path: 'planes', label: 'Planes de Estudio', icon: 'icon-[basil--document-outline]', menu: true, },
								{ path: 'planes/detalle', Component: PlanEstudioDetalle, menu: false },
							],
							menu: true,
						},
						{
							path: 'docentes',
							label: 'Docentes',
							icon: 'icon-[hugeicons--teacher]',
							children: [
								{ path: 'gestion', label: 'Gestionar Docentes', icon: 'icon-[mdi--account-student]', menu: true, },
								{ path: 'parametros', label: 'Parámetros de Régimen', icon: 'icon-[material-symbols--rule]', menu: true, },
								{ path: 'detalle/:id', Component: DocenteDetalle, menu: false },
							],
							menu: true,
						},
						{
							path: 'designaciones',
							label: 'Designaciones',
							icon: 'icon-[material-symbols--pending-actions]',
							children: [
								{ path: 'gestion', label: 'Gestión', icon: 'icon-[fluent--document-person-16-filled]', menu: true, },
							],
							menu: true,
						},
						{
							path: 'estadisticas',
							label: 'Estadísticas',
							icon: 'icon-[akar-icons--statistic-up]',
							children: [
								{ path: 'estadisticas', label: 'Estadísticas', icon: 'icon-[akar-icons--statistic-up]', menu: true, },
								{ path: 'reportes', label: 'Reportes', icon: 'icon-[mdi--report-bar-stacked]', menu: true, },
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