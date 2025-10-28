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
  MenubarTrigger,
} from "@components/ui/menubar"


type prop = {
  subtitle : string
}

const SubItemAcordeon = ({subtitle} : prop) =>{
  return (
    <div className="flex items-centertext-sm rounded-sm hover:bg-accent">
      <span className="iconify tabler--point-filled size-4" />
      <span>{subtitle}</span>
    </div>
  );
}

type props = {
  itemNumber : string
  icon : string
  title : string
  children : React.ReactNode
}


const ElemAcordeon = ({itemNumber, icon, title, children}: props)=> {
  return (
      <AccordionItem value={itemNumber}  className="border-b-0">
        <AccordionTrigger className="px-2 py-1.5 text-sm font-medium hover:bg-accent hover:no-underline rounded-sm" hideIcon={true}>
          <div className="flex items-center text-sm rounded-sm hover:bg-accent gap-2">
            <span className={`iconify ${icon} size-5`} />
            <span>{title}</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-1 pl-3">
          {children}
          <MenubarSeparator/>
        </AccordionContent>
    </AccordionItem>
  );
}

type concha = {
  sitio: string
}
export default function Navbar({sitio} : concha) {
  return (
    <Menubar className="justify-between rounded-none h">
      <MenubarMenu>
        <MenubarTrigger>
          <span className="iconify ion--menu size-5 text-black" />
        </MenubarTrigger>
        <MenubarContent>

          <Accordion type="single" collapsible className="w-full">

            <ElemAcordeon itemNumber="item-1" icon="eos-icons--admin-outlined" title="Administración">
              <SubItemAcordeon subtitle="Usuarios"/>
              <SubItemAcordeon subtitle="Roles"/>
            </ElemAcordeon>

            <ElemAcordeon itemNumber="item-2" icon="cil--institution" title="Académica">
              <SubItemAcordeon subtitle="Institutos"/>
              <SubItemAcordeon subtitle="Carreras"/>
              <SubItemAcordeon subtitle="Asignaturas"/>
              <SubItemAcordeon subtitle="Planes de Estudio"/ >
            </ElemAcordeon>

            <ElemAcordeon itemNumber="item-3" icon="hugeicons--teacher" title="Docentes">
              <SubItemAcordeon subtitle="Gestionar Docentes"/>
              <SubItemAcordeon subtitle="Parámetros de Régimen"/>
            </ElemAcordeon>

            <ElemAcordeon itemNumber="item-4" icon="material-symbols--pending-actions" title="Designaciones">
              <SubItemAcordeon subtitle="Gestionar Designaciones"/>    
            </ElemAcordeon>

            <ElemAcordeon itemNumber="item-5" icon="akar-icons--statistic-up" title="Estadísticas">
              <SubItemAcordeon subtitle="Estadísticas"/>
              <SubItemAcordeon subtitle="Reportes"/>
            </ElemAcordeon>
                            
          </Accordion>
        </MenubarContent>
      </MenubarMenu>
      
      <h2 className="text-2xl text-black">{sitio}</h2>

      <MenubarMenu>
        <MenubarTrigger>
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