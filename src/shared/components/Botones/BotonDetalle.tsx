import BotonBase from "./BotonBase";

type BotonDetalleProps = {
	onClick?: () => void,
};

export default function BotonDetalle({ onClick }: BotonDetalleProps) {
	return (
		<BotonBase className="h-10 w-10 rounded-full bg-[#49454F] p-0 hover:bg-[#303030]" onClick={onClick}>
			<span className="icon-[majesticons--share] text-4xl text-white" />
		</BotonBase>
	)
}
