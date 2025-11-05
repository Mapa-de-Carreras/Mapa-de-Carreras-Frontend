import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

import {
  MenubarSeparator,
} from "@components/ui/menubar";
import SubItemAcordeon from "./SubItemAcordeon";


type ItemProp = {
  id: string;
  icon: string;
  title: string;
  subtitles: string[];
};

const AccordionNavElement = ({ id, icon, title, subtitles }: ItemProp) => {
  return (
    <AccordionItem value={id} className="border-b-0">
      <AccordionTrigger
        className="px-2 py-1.5 text-sm font-medium hover:bg-accent hover:no-underline rounded-sm"
        hideIcon={true}
      >
        <div className="flex items-center text-sm rounded-sm gap-1 min-w-0">
          <span className={`${icon} size-5 flex-shrink-0`} />
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

export default AccordionNavElement;