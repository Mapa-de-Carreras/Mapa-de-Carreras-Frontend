import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@components/ui/menubar";

const NAVBAR_ITEMS = [
  {
    title: "Administración",
    icon: "eos-icons--admin-outlined",
    id: "item-1",
    subtitles: ["Usuarios", "Roles"],
  },
  {
    title: "Académica",
    icon: "cil--institution",
    id: "item-2",
    subtitles: ["Institutos", "Carreras", "Asignaturas", "Planes de Estudio"],
  },
  {
    title: "Docentes",
    icon: "hugeicons--teacher",
    id: "item-3",
    subtitles: ["Gestionar Docentes", "Parámetros de Régimen"],
  },
  {
    title: "Designaciones",
    icon: "material-symbols--pending-actions",
    id: "item-4",
    subtitles: ["Gestionar Designaciones"],
  },
  {
    title: "Estadísticas",
    icon: "akar-icons--statistic-up",
    id: "item-5",
    subtitles: ["Estadísticas", "Reportes"],
  },
];

type SubItemProp = {
  subtitle: string;
};

const SubItemAcordeon = ({ subtitle }: SubItemProp) => {
  return (
    <div className="flex items-center text-sm rounded-sm hover:bg-accent gap-2">
      <span className="iconify tabler--point-filled size-3" />
      <span>{subtitle}</span>
    </div>
  );
};

type ItemProp = (typeof NAVBAR_ITEMS)[number];

const AccordionNavElement = ({ id, icon, title, subtitles }: ItemProp) => {
  return (
    <AccordionItem value={id} className="border-b-0">
      <AccordionTrigger
        className="px-2 py-1.5 text-sm font-medium hover:bg-accent hover:no-underline rounded-sm"
        hideIcon={true}
      >
        <div className="flex items-center text-sm rounded-sm gap-1 min-w-0">
          <span className={`iconify ${icon} size-5 flex-shrink-0`} />
          <span className="truncate">{title}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pb-1 pl-3 min-w-50">
        {subtitles.map((subtitle) => (
          <SubItemAcordeon key={subtitle} subtitle={subtitle} />
        ))}
        <MenubarSeparator />
      </AccordionContent>
    </AccordionItem>
  );
};

const NavMenuItem = ({ title, subtitles }: ItemProp) => {
    return (
        <MenubarMenu>
            <MenubarTrigger className="font-medium whitespace-nowrap truncate max-w-[120px] px-2">
                 {title}
            </MenubarTrigger>
            <MenubarContent>
                {subtitles.map((subtitle) => (
                    <MenubarItem key={subtitle}>
                      <SubItemAcordeon subtitle={subtitle} />
                    </MenubarItem>
                ))}
            </MenubarContent>
        </MenubarMenu>
    );
}

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
              <span className="iconify ion--menu size-5 text-white flex-shrink-0" />
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
              <span className="iconify carbon--user-avatar-filled size-5 text-white flex-shrink-0" />
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
}