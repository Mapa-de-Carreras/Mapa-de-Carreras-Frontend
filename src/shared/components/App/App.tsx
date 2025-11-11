import { Outlet } from 'react-router'
import Navbar from '@components/Navbar/Navbar'
import NavbarMobile from '@components/Navbar/NavbarMobile'
import useRoutes from '@hooks/useRoutes'

export default function App() {
	const rutas = useRoutes();

	return (
		<div className="flex h-full w-full flex-col sm:flex-row">
			<Navbar rutas={rutas} />
			<NavbarMobile rutas={rutas} />
			<Outlet />
		</div>
	)
}
