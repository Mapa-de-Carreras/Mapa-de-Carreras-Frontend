import { ReactNode } from "react";
import { useNavigate } from "react-router";

type HomeCardProps = {
	route: string,
	icon: string,
	children: ReactNode,
};

export default function HomeCard({ route, icon, children }: HomeCardProps) {
	const navigate = useNavigate();

	const onClick = () => {
		navigate(route);
	};

	return (
		<div
			className="
				bg-card-home flex h-40 grow items-end rounded-xl p-5
				hover:shadow-xl border-2 border-transparent hover:bg-card-home-accent span-y
			"
		>
			<div className='flex flex-col grow'>
				<span className={`text-8xl ${icon}`} />
				<h4 className="text-3xl font-medium text-card-home-foreground">{children}</h4>
			</div>
			<button className='flex items-center gap-2 text-xl font-semibold cursor-pointer px-2 text-link hover:text-link-hover' onClick={onClick}>
				<p>Ingresar</p>
				<span className='icon-[majesticons--share] text-4xl' />
			</button>
		</div>
	);
}
