// 1. Importa los componentes de Accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion" 

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,

  MenubarSeparator,
  MenubarSub,
  MenubarTrigger,
} from "@components/ui/menubar"

export default function Navbar() {
  return (
    <Menubar className="justify-between rounded-none h">
      <MenubarMenu>
        <MenubarTrigger>
          <span className="iconify ion--menu size-5 text-black" />
        </MenubarTrigger>
        <MenubarContent>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1"  className="border-b-0">
              <AccordionTrigger className="px-2 py-1.5 text-sm font-medium hover:bg-accent hover:no-underline rounded-sm" hideIcon={true}>
                <div className="flex items-center text-sm rounded-sm hover:bg-accent gap-2">
                  <span className="iconify eos-icons--admin-outlined  size-5" />
                  <span>Administración</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-1 pl-7">

                                
              <div className="flex items-centertext-sm rounded-sm hover:bg-accent">
                <span className="iconify tabler--point-filled size-4" />
                <span>Usuarios</span>
              </div>
                
              <div className="flex items-center text-sm rounded-sm hover:bg-accent">
                <span className="iconify tabler--point-filled size-4" />
                <span>Roles</span>
              </div>

              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <MenubarSeparator />
          <MenubarItem>
            Académica 
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Docentes 
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Designaciones 
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem> 
            Estadísticas 
          </MenubarItem>

        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className= "text-black">Inicio</MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          {/* Asegúrate de tener 'carbon' en tu index.css @plugin prefixes */}
          <span className="iconify carbon--user-avatar-filled size-5 text-black" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>Perfil</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Cerrar Sesion</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}