import App from '@components/App/App'
import LoginPage from '@users/LoginPage/LoginPage'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Home from './Home'
import RecoverUsername from "../modules/users/RecoverUserName/RecoverUsername";
import RecoverPassword1 from '../modules/users/RecoverPassword/RecoverPassword1'
import RecoverPassword2 from '../modules/users/RecoverPassword/RecoverPassword2'
import RecoverPassword3 from '../modules/users/RecoverPassword/RecoverPassword3'
import ProtectedRoute from '@components/Providers/ProtectRouter'
import GuestRoute from '@components/Providers/GuestRoute'
import { appRoutes } from '@services/routes/routes'

export default function Router() {
	const mapRoutes = (routes: typeof appRoutes) =>
		routes.flatMap((route) => {
			const basePath = route.path
			return (
				route.children?.map((child) => ({
					path: `${basePath}/${child.path}`,
					Component: child.component || (() => <div>{child.label}</div>),
				})) || []
			)
		})

	const rutas = [
		{
			path: 'authentication',
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
			element: <ProtectedRoute />,
			children: [
				{
					path: '/',
					Component: App,
					children: [
						{ index: true, Component: Home },
						...mapRoutes(appRoutes),
					],
				},
			],
		},
		{ path: '*', element: <div>Error</div> },
	]

	const router = createBrowserRouter(rutas)
	return <RouterProvider router={router} />
}
