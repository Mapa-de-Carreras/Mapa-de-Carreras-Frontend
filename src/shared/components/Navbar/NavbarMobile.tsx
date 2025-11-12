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

type NavbarMobileProps = {
	rutas: Route[]
};

export default function NavbarMobile({ rutas }: NavbarMobileProps) {
	const [open, setOpen] = useState(false)

	return (
		<nav className="bg-sidebar z-10 flex h-20 w-full flex-row justify-between sm:hidden p-4">
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
						{rutas.map((ruta) => (
							<NavItemMobile key={ruta.path || "Home"} ruta={ruta} />
						))}
					</ul>
				</DrawerContent>
			</Drawer>
			<UserMenu collapsed align="end" side="bottom" className="w-15" />
		</nav>
	)
}
