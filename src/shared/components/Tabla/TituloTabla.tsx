import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@components/ui/menubar";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type HeaderProps<TData> = {
	titulo: string,
	column: Column<TData>
};

export default function TituloTabla<TData,>({ titulo, column }: HeaderProps<TData>) {
	const orderColumns = () => {
		column.toggleSorting(column.getIsSorted() === "asc");
	};

	return (
		<Menubar className="border-none bg-transparent shadow-none p-0 h-auto">
			<MenubarMenu>
				<MenubarTrigger
						className="
							text-xl cursor-pointer px-0 font-semibold
							hover:bg-transparent hover:text-primary
							focus:bg-transparent focus:text-primary
							data-[state=open]:bg-transparent
							data-[state=open]:text-primary
						"
					>
					{titulo}
				</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onClick={orderColumns}>
						<ArrowUpDown className="h-4 w-4 mr-2" />
						Ordenar
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}