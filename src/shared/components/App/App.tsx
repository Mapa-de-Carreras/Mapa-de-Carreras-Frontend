import { Outlet } from 'react-router'
import Navbar from '@components/Navbar/Navbar'
import NavbarMobile from '@components/Navbar/NavbarMobile'
import useRoutes from '@hooks/useRoutes'

export default function App() {
	const { rutasMenu } = useRoutes();

	return (
		<div className="flex h-full w-full flex-col sm:flex-row">
			<Navbar rutas={rutasMenu} />
			<NavbarMobile rutasMenu={rutasMenu} />
			<Outlet />
		</div>
	)
}
