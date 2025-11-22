import App from '@components/App/App'
import Home from './Home'
import ProtectedRoute from '@components/Providers/ProtectRouter'
import GuestRoute from '@components/Providers/GuestRoute'
import RouterMapa from '@components/Providers/RouterMapa'
import { Route } from '@globalTypes/route'
import RecoverUsername from '@users/RecoverUserName/RecoverUsername'
import RecoverPassword1 from '@users/RecoverPassword/RecoverPassword1'
import RecoverPassword2 from '@users/RecoverPassword/RecoverPassword2'
import RecoverPassword3 from '@users/RecoverPassword/RecoverPassword3'
import UserDetail from '@users/UserDetail/UserDetail'
import UserEdit from '@users/UserEdit/UserEdit'
import NotificacionesPage from '@users/NotificacionesPage/NotificacionesPage'
import DegreePage from '@academic/DegreePage/DegreePage'
import DegreeDetail from '@academic/DegreePage/DegreeDetail'
import SubjectPage from '@academic/SubjectPage/SubjectPage'
import InstitutesDetail from '@academic/InstitutesPage/InstitutesDetail'
import PlanEstudioDetalle from '@academic/PlanDeEstudio/PlanEstudioDetalle'
import SubjectDetail from '@academic/SubjectPage/SubjectDetail'
import SubjectAdd from '@academic/SubjectPage/SubjectAdd'
import SubjectEdit from '@academic/SubjectPage/SubjectEdit'
import InstitutesAdd from '@academic/InstitutesPage/InstitutesAdd'
import InstitutesEdit from '@academic/InstitutesPage/InsitutesEdit'
import DegreeAdd from '@academic/DegreePage/DegreeAdd'
import DegreeEdit from '@academic/DegreePage/DegreeEdit'
import DocenteDetalle from '../modules/Docentes/DocenteDetalle'
import PaginaDocentes from '../modules/Docentes/PaginaDocentes'
import CrearDocente from '../modules/Docentes/CrearDocente'
import EditarDocente from '../modules/Docentes/EditarDocente'
import PaginaIniciarSesion from '@usuarios/PaginaIniciarSesion/PaginaIniciarSesion'
import PaginaUsuarios from '@usuarios/PaginaUsuarios/PaginaUsuarios'
import PlanEstudioAgregar from '@academic/PlanDeEstudio/PlanEstudioAgregar'
import PaginaPlanEstudio from '@academic/PlanDeEstudio/PaginaPlanEstudio'
import PaginaCrearUsuario from '@usuarios/PaginaCrearUsuario/PaginaCrearUsuarios'
import PaginaDesignaciones from '../modules/Designaciones/PaginaDesignaciones'
import DesignacionDetalle from '../modules/Designaciones/DesignacionesDetalle'
import DesignacionesAgregar from '../modules/Designaciones/DesignacionesAgregar'
import PaginaInstitutos from '@academica/PaginaInstitutos/PaginaInstitutos'

export default function Router() {
	const rutas: Route[] = [
		{
			path: '/authentication',
			element: <GuestRoute />,
			children: [
				{ path: 'login', Component: PaginaIniciarSesion },
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
								{ path: 'usuarios', label: 'Usuarios', icon: 'icon-[mdi--user-group]', Component: PaginaUsuarios, menu: true, },
								{ path: 'usuarios/crear', Component: PaginaCrearUsuario, menu: false },
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
								{ path: 'institutos', label: 'Institutos', icon: 'icon-[cil--institution]', Component: PaginaInstitutos, menu: true, },
								{ path: 'institutos/detalle/:id', Component:  InstitutesDetail, menu: false},
								{path: 'institutos/agregar', Component: InstitutesAdd, menu: false},
								{path: 'institutos/editar/:id', Component: InstitutesEdit, menu: false},
								{ path: 'carreras', label: 'Carreras', icon: 'icon-[icon-park-outline--degree-hat]', Component: DegreePage, menu: true, },
								{ path: 'carreras/detalle/:id', Component: DegreeDetail, menu: false },
								{ path: 'carreras/agregar', Component: DegreeAdd, menu: false },
								{ path: 'carreras/editar/:id', Component: DegreeEdit, menu: false },
								{ path: 'asignaturas', label: 'Asignaturas', icon: 'icon-[octicon--book-16]', Component: SubjectPage, menu: true,},
								{ path: 'asignaturas/detalle/:id', Component: SubjectDetail, menu: false },
								{ path: 'asignaturas/agregar', Component: SubjectAdd, menu: false },
								{ path: 'asignaturas/editar/:id', Component: SubjectEdit, menu: false },
								{ path: 'planes', label: 'Planes de Estudio',Component:PaginaPlanEstudio, icon: 'icon-[basil--document-outline]', menu: true, },
								{ path: 'planes/detalle', Component: PlanEstudioDetalle, menu: false },
								{ path: 'planes/agregar', Component: PlanEstudioAgregar, menu: false },
							],
							menu: true,
						},
						{
							path: 'docentes',
							label: 'Docentes',
							icon: 'icon-[hugeicons--teacher]',
							children: [
								{ path: 'gestion', label: 'Gestionar Docentes', Component: PaginaDocentes, icon: 'icon-[mdi--account-student]', menu: true, },
								{ path: 'parametros', label: 'Parámetros de Régimen', icon: 'icon-[material-symbols--rule]', menu: true, },
								{ path: 'detalle/:id', Component: DocenteDetalle, menu: false },
								{ path: 'agregar', Component: CrearDocente, menu: false },
								{ path: 'editar', Component: EditarDocente, menu: false },
							],
							menu: true,
						},
						{
							path: 'designaciones',
							label: 'Designaciones',
							icon: 'icon-[material-symbols--pending-actions]',
							children: [
								{ path: 'gestion', label: 'Gestión', Component: PaginaDesignaciones, icon: 'icon-[fluent--document-person-16-filled]', menu: true, },
								{ path: 'detalle/:id', Component: DesignacionDetalle, menu: false },
								{ path: 'agregar', Component: DesignacionesAgregar, menu: false },
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