import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Button } from "@components/ui/button";
import { useTheme } from "@components/hooks/useTheme";

export function UserSettingMenu() {
	const { setTheme } = useTheme();

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="settings">
				<AccordionTrigger className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent/20">
					<span className="icon-[lucide--settings]" />
					Configuración
				</AccordionTrigger>

				<AccordionContent className="pl-8 flex flex-col gap-2">
					<Button onClick={() => setTheme("light")}>
						<span className="icon-[lucide--sun]" />
						Claro
					</Button>
					<Button onClick={() => setTheme("dark")}>
						<span className="icon-[lucide--moon]" />
						Oscuro
					</Button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
