import { Button } from "@components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type HeaderProps<TData> = {
	titulo: string,
	column: Column<TData>
};

export default function TituloTabla<TData,>({ titulo, column }: HeaderProps<TData>) {
	return (
		<div className="">
			{titulo}
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>

				<ArrowUpDown className="h-4 w-4" />
			</Button>
		</div>
	);
}