import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { useState } from 'react'
import { UserMenu } from './UserMenu';
import { rutas } from './rutasProvisorias';
import NavItemMobile from './NavItemMobile';

export default function NavbarMobile() {
    const [open, setOpen] = useState(false);
    
	return (
		<nav className="bg-sidebar flex flex-row items-center justify-between h-15 w-full sm:hidden z-10">
			<Drawer direction='bottom' open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
                    <button
                        className={`h-full px-2 flex items-center justify-center ${open ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"}`}
                    >
                        <span className='icon-[ion--menu] text-4xl' />
                    </button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className='text-3xl'>Menú</DrawerTitle>
					</DrawerHeader>
                    <ul className="flex w-full flex-col items-end gap-1 overflow-y-auto">
                        {rutas.map((ruta) => (
                            <NavItemMobile
                                key={ruta.path}
                                ruta={ruta}
                            />
                        ))}
                    </ul>
				</DrawerContent>
			</Drawer>
            <h2 className='text-3xl font-semi'>Home</h2>
            <UserMenu collapsed align='end' side='bottom' className='w-15'/>
		</nav>
	)
}