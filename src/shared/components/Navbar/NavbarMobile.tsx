import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@components/ui/drawer'
import { useState } from 'react'
import { UserMenu } from './UserMenu'
import NavItemMobile from './NavItemMobile'
import { Route } from '@globalTypes/route'
import { useLocation } from 'react-router'
import useRoutes from '@hooks/useRoutes'

type NavbarMobileProps = {
	rutasMenu: Route[]
}

export default function NavbarMobile({ rutasMenu }: NavbarMobileProps) {
	const location = useLocation()
	const { rutas } = useRoutes()

	const compararRuta = (ruta: Route, pathname: string) =>
		ruta.headerkey && pathname.includes(ruta.headerkey) ? ruta : undefined

	const rutaActual = rutas.reduce(
		(acc: Route | undefined, ruta: Route) => {
			// Si ya encontramos una coincidencia en una iteración anterior, la devolvemos inmediatamente
			if (acc) return acc

			// 1. Buscar en las subrutas
			const subrutaCoincidente = ruta.children?.find((child) =>
				compararRuta(child, location.pathname)
			)

			// 2. Si hay subruta coincidente, devolverla como el nuevo acumulador (acc)
			if (subrutaCoincidente) {
				return subrutaCoincidente
			}

			// 3. Si no, verificar si la ruta padre coincide y devolverla
			return compararRuta(ruta, location.pathname)
		},
		undefined as Route | undefined
	)

	const [open, setOpen] = useState(false)

	return (
		<nav className="bg-sidebar z-10 flex h-20 w-full justify-between p-4 sm:hidden">
			<div className="flex items-center gap-2">
				<Drawer direction="bottom" open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<button
							className={`flex h-full items-center justify-center rounded-xl px-2 ${open ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'}`}
						>
							<span className="icon-[ion--menu] text-4xl" />
						</button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle className="text-3xl">Menú</DrawerTitle>
						</DrawerHeader>
						<ul className="flex w-full flex-col items-end gap-1 overflow-y-auto">
							{rutasMenu.map((ruta) => (
								<NavItemMobile key={ruta.path || 'Home'} ruta={ruta} />
							))}
						</ul>
					</DrawerContent>
				</Drawer>
				<h2 className="text-xl font-medium">
					{rutaActual && rutaActual.label ? rutaActual.label : 'Home'}
				</h2>
			</div>
			<UserMenu collapsed align="end" side="bottom" className="w-15" />
		</nav>
	)
}
