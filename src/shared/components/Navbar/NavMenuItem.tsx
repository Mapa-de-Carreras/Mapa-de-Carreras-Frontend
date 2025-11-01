import { MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@radix-ui/react-menubar";
import { ItemProp } from "./Datos";
import SubItemAcordeon from "./SubItemAcordeon";

const NavMenuItem = ({ title, subtitles }: ItemProp) => {
    return (
        <MenubarMenu>
            <MenubarTrigger className="font-medium whitespace-nowrap truncate max-w-[120px] px-2 hover:bg-accent">
                 {title}
            </MenubarTrigger>
            <MenubarContent>
                {subtitles.map((subtitle) => (
                    <MenubarItem key={subtitle}>
                      <SubItemAcordeon  subtitle={subtitle} />
                    </MenubarItem>
                ))}
            </MenubarContent>
        </MenubarMenu>
    );
}

export default NavMenuItem;