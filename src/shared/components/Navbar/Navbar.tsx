import { useTheme } from '@components/hooks/useTheme'
import NavItem from './NavItem'
import LOGOBLANCO from '@assets/UNTDF png Blanco.png'
import LOGONORMAL from '@assets/UNTDF png Color.png'
import { useState } from 'react'
import { cn } from '@components/lib/utils'
import { UserMenu } from './UserMenu'
import { rutas } from './rutasProvisorias'

export default function Navbar() {
	const [collapsed, setCollapsed] = useState<boolean>(false)
	const { realTheme } = useTheme();

	return (
		<nav
			className={cn(
				'hidden sm:block bg-sidebar border-sidebar-border scroll-hidden h-full overflow-y-auto border-r p-2 transition-all duration-300 ease-in-out z-10',
				collapsed ? 'w-20' : 'w-70' // 🔹 ancho animado
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
						src={realTheme.includes('dark') ? LOGOBLANCO : LOGONORMAL}
						alt="logo"
						className="w-60 p-2 transition-opacity transition-transform"
					/>
				</div>
			</div>

			<hr className="border-sidebar-border my-2" />
			
			<UserMenu collapsed={collapsed} align='start' side='right'/>

			<hr className="border-sidebar-border my-2" />

			<ul className="flex w-full flex-col items-end gap-1">
				{rutas.map((ruta) => (
					<NavItem
						key={ruta.path}
						ruta={ruta}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/> // 🔹 pasa el estado
				))}
			</ul>
		</nav>
	)
}