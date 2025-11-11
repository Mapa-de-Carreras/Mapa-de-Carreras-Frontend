import { useTheme } from '@components/hooks/useTheme'
import NavItem from './NavItem'
import LOGOBLANCO from '@assets/UNTDF png Blanco.png'
import LOGONORMAL from '@assets/UNTDF png Color.png'
import { useState } from 'react'
import { cn } from '@components/lib/utils'
import { UserMenu } from './UserMenu'
import { Route } from '@globalTypes/route'

type NavbarProps = {
	rutas: Route[]
}

export default function Navbar({ rutas }: NavbarProps) {
	const [collapsed, setCollapsed] = useState<boolean>(false)
	const { theme } = useTheme()

	return (
		<nav
			className={cn(
				'bg-sidebar border-sidebar-border scroll-hidden z-10 hidden h-full overflow-y-auto border-r p-2 transition-all duration-300 ease-in-out sm:block',
				collapsed ? 'w-20' : 'w-90' // 🔹 ancho animado
			)}
		>
			<div className="flex flex-col items-center">
				<button
					onClick={() => setCollapsed(!collapsed)}
					className={`text-sidebar-foreground hover:text-sidebar-primary my-2 self-end transition-colors ${collapsed ? 'w-full' : 'flex w-full justify-end'}`}
				>
					<span
						className={
							collapsed
								? 'icon-[lucide--panel-right] text-2xl'
								: 'icon-[lucide--panel-left] text-2xl'
						}
					/>
				</button>
				<div
					className={cn(
						'flex justify-center overflow-hidden transition-all ease-in-out',
						collapsed
							? 'scale-90 opacity-0 duration-300' // 🔹 logo se encoge rápido
							: 'scale-100 opacity-100 duration-300'
					)}
				>
					<img
						src={theme.includes('dark') ? LOGOBLANCO : LOGONORMAL}
						alt="logo"
						className="w-60 p-2 transition-transform"
					/>
				</div>
			</div>

			<hr className="border-sidebar-border my-2" />

			<UserMenu collapsed={collapsed} align="start" side="right" />

			<hr className="border-sidebar-border my-2" />

			<ul className="flex w-full flex-col items-end gap-1 px-2">
				{rutas.map((ruta) => (
					<NavItem
						key={ruta.path || 'Home'}
						ruta={ruta}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				))}
			</ul>
		</nav>
	)
}
