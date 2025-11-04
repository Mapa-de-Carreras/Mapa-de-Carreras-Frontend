<<<<<<< HEAD
import { useTheme } from '@components/hooks/useTheme'
import NavItem from './NavItem'
import LOGOBLANCO from '@assets/UNTDF png Blanco.png'
import LOGONORMAL from '@assets/UNTDF png Color.png'
import { useState } from 'react'
import { cn } from '@components/lib/utils'
import { UserMenu } from './UserMenu'
import { rutas } from './rutasProvisorias'
=======
import {
  Accordion,
} from "@components/ui/accordion";
>>>>>>> b2e7fae (update navbar)

export default function Navbar() {
	const [collapsed, setCollapsed] = useState<boolean>(false);

<<<<<<< HEAD
	const { theme } = useTheme();

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
						src={theme.includes('dark') ? LOGOBLANCO : LOGONORMAL}
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
=======
import { NAVBAR_ITEMS } from "@components/Navbar/Datos";
import AccordionNavElement from "./AccordionNavElement";
import NavMenuItem from "./NavMenuItem";


type NavbarProps = {
  sitio: string;
};

export default function Navbar({ sitio }: NavbarProps) {
  return (
    <Menubar className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center rounded-none h-10 px-4 gap-2">

      <section className="flex items-center min-w-0">
        <div className="lg:hidden">
          <MenubarMenu>
            <MenubarTrigger className="min-w-0">
              <span className="icon-[ion--menu] size-5 text-white flex-shrink-0" />
            </MenubarTrigger>
            <MenubarContent>
              <Accordion type="single" collapsible className="w-[200px]">
                {NAVBAR_ITEMS.map((item) => (
                  <AccordionNavElement key={item.id} {...item} />
                ))}
              </Accordion>
            </MenubarContent>
          </MenubarMenu>        
        </div>

        <div className="hidden lg:flex items-center min-w-0 overflow-hidden">
          {NAVBAR_ITEMS.map((item) => (
              <NavMenuItem key={item.id} {...item} />
          ))}
        </div>
      </section>   
     
      <h2 className="text-center text-xl text-white font-semibold truncate px-2 min-w-0 max-w-[35vw]">
        {sitio}
      </h2>     
     
      <section className="flex items-center justify-end min-w-0">
        <div className="lg:hidden">
          <MenubarMenu>
            <MenubarTrigger className="min-w-0">
              <span className="icon-[carbon--user-avatar-filled]  size-5 text-white flex-shrink-0" />
            </MenubarTrigger> 
            <MenubarContent>
              <MenubarItem inset>Perfil</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Cerrar Sesion</MenubarItem>
            </MenubarContent>
          </MenubarMenu>        
        </div>

        <div className="hidden lg:flex items-center min-w-0 overflow-hidden">
          <MenubarMenu> 
            <MenubarTrigger className="font-medium text-sm whitespace-nowrap truncate max-w-[80px] px-2">
              Perfil
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu> 
            <MenubarTrigger className="font-medium text-sm whitespace-nowrap truncate max-w-[120px] px-2">
              Cerrar Sesion
            </MenubarTrigger>
          </MenubarMenu>
        </div>
      </section>
    </Menubar>
  );
>>>>>>> b2e7fae (update navbar)
}