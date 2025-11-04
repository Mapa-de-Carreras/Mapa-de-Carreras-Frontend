import { Button } from "@components/ui/button";

type AccionTablaProps = {
    onClick: () => void,
};

export default function AccionTabla({ onClick }: AccionTablaProps) {
    return (
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={onClick}>
			<span className="icon-[majesticons--share]" />
		</Button>
    );
}