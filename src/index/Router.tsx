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
import NotificacionesPage from '@users/NotificacionesPage/NotificacionesPage'

import PaginaCarreras from '@academica/PaginaCarreras/PaginaCarreras'
import DetallesCarrera from '@academica/PaginaCarreras/DetallesCarrera'
import EditarCarrera from '@academica/PaginaCarreras/EditarCarrera'
import AgregarCarrera from '@academica/PaginaCarreras/AgregarCarrera'

import PaginaInstitutos from '@academica/PaginaInstitutos/PaginaInstitutos'
import DetalleInstituto from '@academica/PaginaInstitutos/DetallesInstituto'
import EditarInstituto from '@academica/PaginaInstitutos/EditarInstituto'
import AgregarInstituto from '@academica/PaginaInstitutos/AgregarInstituto'

import PaginaAsignaturas from '@academica/PaginaAsignaturas/PaginaAsignaturas'
import DetallesAsignatura from '@academica/PaginaAsignaturas/DetallesAsignatura'
import EditarAsignatura from '@academica/PaginaAsignaturas/EditarAsignatura'
import AgregarAsignatura from '@academica/PaginaAsignaturas/AgregarAsignatura'

import PlanEstudioDetalle from '@academica/PaginaPlanesEstudio/PlanEstudioDetalle'

import DocenteDetalle from '../modules/Docentes/DocenteDetalle'
import PaginaDocentes from '../modules/Docentes/PaginaDocentes'
import CrearDocente from '../modules/Docentes/CrearDocente'
import EditarDocente from '../modules/Docentes/EditarDocente'
import PaginaIniciarSesion from '@usuarios/PaginaIniciarSesion/PaginaIniciarSesion'
import PaginaUsuarios from '@usuarios/PaginaUsuarios/PaginaUsuarios'
import PlanEstudioAgregar from '@academica/PaginaPlanesEstudio/PlanEstudioAgregar'
import PaginaPlanEstudio from '@academica/PaginaPlanesEstudio/PaginaPlanEstudio'
import PaginaCrearUsuario from '@usuarios/PaginaCrearUsuario/PaginaCrearUsuarios'
import PaginaDesignaciones from '../modules/Designaciones/PaginaDesignaciones'
import DesignacionDetalle from '../modules/Designaciones/DesignacionesDetalle'
import DesignacionesAgregar from '../modules/Designaciones/DesignacionesAgregar'
import NotFoundPage from './NotFoundPage'
import PlanEstudioEditar from '@academica/PaginaPlanesEstudio/PlanEstudioEditar'
import PaginaDocumentos from '../modules/Documentos/PaginaDocumentos'
import AgregarDocumentos from '../modules/Documentos/AgregarDocumentos'
import useRol from '@hooks/useRol'
import DetalleDocumentos from '../modules/Documentos/DetalleDocumentos'
import PaginaComisiones from '@academica/Comisiones/PaginaComisiones'
import ComisionesDetalle from '@academica/Comisiones/ComisionesDetalle'
import ComisionEditar from '@academica/Comisiones/ComisionesEditar'
import ComisionesAgregar from '@academica/Comisiones/ComisionesAgregar'
import PaginaPlanAsignatura from '@academica/PlanAsignatura/PaginaPlanAsignatura'
import PlanAsignaturaDetalle from '@academica/PlanAsignatura/PlanAsignaturaDetalle'
import PlanAsignaturaAgregar from '@academica/PlanAsignatura/PlanAsignaturaAgregar'
import PlanAsignaturaEditar from '@academica/PlanAsignatura/PlanAsignaturaEditar'
import PaginaDetalleUsuario from '@usuarios/PaginaDetalleUsuario/PaginaDetalleUsuario'
import PaginaEditarUsuario from '@usuarios/PaginaEditarUsuario/PaginaEditarUsuario'
import DesignacionesEditar from '../modules/Designaciones/DesignacionesEditar'

import Reportes from '../modules/Estadisticas/Reportes'
import PaginaCaracteres from '../modules/Docentes/caracteres/PaginaCaracteres'
import PaginaCaracter from '../modules/Docentes/caracteres/PaginaCaracter'


export default function Router() {
	const esAdmin = useRol('Administrador');

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
						...(esAdmin ? [{
							path: 'administracion',
							label: 'Administración',
							icon: 'icon-[eos-icons--admin-outlined]',
							children: [
								{ path: 'usuarios', label: 'Usuarios', headerkey: 'usuarios', icon: 'icon-[mdi--user-group]', Component: PaginaUsuarios, menu: true, },
								{ path: 'usuarios/crear', label: 'Agregar Usuario', headerkey: 'usuarios/crear', Component: PaginaCrearUsuario, menu: false },
								{ path: 'usuarios/detalle/:id', label: 'Usuario', headerkey: 'usuarios/detalle', Component: PaginaDetalleUsuario, menu: false },
								{ path: 'usuarios/editar/:id', label: 'Editar Usuario', headerkey: 'usuarios/editar', Component: PaginaEditarUsuario, menu: false },
							],
							menu: true,
						}] : []

						),
						{ path: 'notificaciones', Component: NotificacionesPage, menu: false, },
						{
							path: 'academica',
							label: 'Académica',
							icon: 'icon-[cil--institution]',
							children: [
								{ path: 'institutos', label: 'Institutos', headerkey: 'institutos', icon: 'icon-[cil--institution]', Component: PaginaInstitutos, menu: true, },
								{ path: 'institutos/detalle/:id', label: 'Instituto', headerkey: 'institutos/detalle', Component: DetalleInstituto, menu: false },
								{ path: 'institutos/agregar', label: 'Agregar Instituto', headerkey: 'institutos/agregar', Component: AgregarInstituto, menu: false },
								{ path: 'institutos/editar/:id', label: 'Editar Instituto', headerkey: 'institutos/editar', Component: EditarInstituto, menu: false },
								{ path: 'carreras', label: 'Carreras', headerkey: 'carreras', icon: 'icon-[icon-park-outline--degree-hat]', Component: PaginaCarreras, menu: true, },
								{ path: 'carreras/detalle/:id', label: 'Institutos', headerkey: 'carreras/detalle', Component: DetallesCarrera, menu: false },
								{ path: 'carreras/agregar', label: 'Institutos', headerkey: 'carreras/agregar', Component: AgregarCarrera, menu: false },
								{ path: 'carreras/editar/:id', label: 'Institutos', headerkey: 'carreras/editar', Component: EditarCarrera, menu: false },
								{ path: 'asignaturas', label: 'Asignaturas', headerkey: 'asignaturas', icon: 'icon-[octicon--book-16]', Component: PaginaAsignaturas, menu: true, },
								{ path: 'asignaturas/detalle/:id', label: 'Institutos', headerkey: 'asignaturas/detalle', Component: DetallesAsignatura, menu: false },
								{ path: 'asignaturas/agregar', label: 'Institutos', headerkey: 'asignaturas/agregar', Component: AgregarAsignatura, menu: false },
								{ path: 'asignaturas/editar/:id', label: 'Institutos', headerkey: 'asignaturas/editar', Component: EditarAsignatura, menu: false },
								{ path: 'planes', label: 'Planes', headerkey: 'planes', Component: PaginaPlanEstudio, icon: 'icon-[basil--document-outline]', menu: true, },
								{ path: 'planes/detalle', label: 'Institutos', headerkey: 'planes/detalle', Component: PlanEstudioDetalle, menu: false },
								{ path: 'planes/editar/:id', label: 'Institutos', headerkey: 'planes/editar', Component: PlanEstudioEditar, menu: false },
								{ path: 'planes/agregar', label: 'Institutos', headerkey: 'planes/agregar', Component: PlanEstudioAgregar, menu: false },
								{ path: 'comisiones', label: 'Comisiones', headerkey: 'comisiones', icon: 'icon-[mdi--bookshelf]', Component: PaginaComisiones, menu: true, },
								{ path: 'comisiones/agregar/', label: 'Agregar Comisión', headerkey: 'comisiones/agregar/', Component: ComisionesAgregar, menu: false },
								{ path: 'comisiones/detalle/:id', label: 'Comisión', headerkey: 'comisiones/detalle', Component: ComisionesDetalle, menu: false },
								{ path: 'comisiones/editar/:id', label: 'Editar Comisión', headerkey: 'comisiones/editar', Component: ComisionEditar, menu: false },
								{ path: 'planes-asignatura', label: 'Planes de Asignatura', headerkey: 'planes-asignatura', Component: PaginaPlanAsignatura, icon: 'icon-[basil--book-outline]', menu: true, },
								{ path: 'planes-asignatura/agregar', label: 'Planes de Asignatura', headerkey: 'planes-asignatura/agregar', Component: PlanAsignaturaAgregar, menu: false },
								{ path: 'planes-asignatura/detalle/:id', label: 'Planes de Asignatura', headerkey: 'planes-asignatura/detalle', Component: PlanAsignaturaDetalle, menu: false },
								{ path: 'planes-asignatura/editar/:id', label: 'Planes de Asignatura', headerkey: 'planes-asignatura/editar', Component: PlanAsignaturaEditar, menu: false },
							],
							menu: true,
						},
						{
							path: 'docentes',
							label: 'Docentes',
							icon: 'icon-[hugeicons--teacher]',
							children: [
								{ path: 'gestion', label: 'Docentes', headerkey: 'gestion', Component: PaginaDocentes, icon: 'icon-[mdi--account-student]', menu: true, },
								{ path: 'gestion/detalle/:id', label: 'Docente', headerkey: 'gestion/detalle', Component: DocenteDetalle, menu: false },
								{ path: 'gestion/agregar', label: 'Agregar Docente', headerkey: 'gestion/agregar', Component: CrearDocente, menu: false },
								{ path: 'gestion/editar', label: 'Editar Docente', headerkey: 'gestion/editar', Component: EditarDocente, menu: false },
								{ path: 'parametros', label: 'Régimenes', headerkey: 'parametros', icon: 'icon-[material-symbols--rule]', menu: true, },
								{ path: 'caracteres', label: 'Caracteres', headerkey: 'caracteres', Component: PaginaCaracteres, icon: 'icon-[material-symbols--rule]', menu: true, },
								{ path: 'caracteres/agregar', label: 'Agregar Caracter', headerkey: 'caracteres/agregar', Component: PaginaCaracter, icon: 'icon-[material-symbols--rule]', menu: false, },
								{ path: 'caracteres/editar/:id', label: 'Editar Caracter', headerkey: 'caracteres/editar', Component: PaginaCaracter, icon: 'icon-[material-symbols--rule]', menu: false, },
							],
							menu: true,
						},
						{
							path: 'designaciones',
							label: 'Designaciones',
							icon: 'icon-[material-symbols--pending-actions]',
							children: [
								{ path: 'gestion', label: 'Designaciones', Component: PaginaDesignaciones, icon: 'icon-[fluent--document-person-16-filled]', menu: true, },
								{ path: 'detalle/:id', Component: DesignacionDetalle, menu: false },
								{ path: 'agregar', Component: DesignacionesAgregar, menu: false },
								{ path: 'editar/:id', Component: DesignacionesEditar, menu: false },
							],
							menu: true,
						},
						{
							path: 'estadisticas',
							label: 'Estadísticas',
							icon: 'icon-[akar-icons--statistic-up]',
							children: [
								{ path: 'estadisticas', label: 'Estadísticas', icon: 'icon-[akar-icons--statistic-up]', menu: true, },
								{ path: 'reportes', label: 'Reportes', Component: Reportes, icon: 'icon-[mdi--report-bar-stacked]', menu: true, },
							],
							menu: true,
						},
						{
							path: 'documentos',
							label: 'Documentos',
							icon: 'icon-[mdi--file-document-outline]',
							children: [
								{ path: 'gestion', label: 'Documentos', Component: PaginaDocumentos, icon: 'icon-[mdi--file-document-outline]', menu: true, },
								{ path: 'agregar', Component: AgregarDocumentos, menu: false },
								{ path: 'detalle/:id', Component: DetalleDocumentos, menu: false },
							],
							menu: true,
						},
					],
				},
			],
		},
		{ path: '*', element: <NotFoundPage /> },
	]

	return <RouterMapa rutas={rutas} />
}