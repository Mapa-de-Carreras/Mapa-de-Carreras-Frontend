import { Route } from './types'
import { Button } from '@components/ui/button'
import { useLocation, useNavigate } from 'react-router'
import { cn } from '@components/lib/utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@radix-ui/react-accordion'

type NavItemProps = {
	ruta: Route,
}

export default function NavItemMobile({ ruta }: NavItemProps) {
	const location = useLocation()
	const navigate = useNavigate()
	const isActive = location.pathname.startsWith(ruta.path)

	if (!ruta.children) {
		return (
			<li className="w-full">
				<Button
					variant="ghost"
					onClick={() => navigate(ruta.path)}
					className={cn(
						'w-full gap-2 justify-center text-4xl',
						isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
					)}
				>
					<span className={`${ruta.icon}`} />
					<span>{ruta.label}</span>
				</Button>
			</li>
		)
	}

	return (
		<Accordion
			type="single"
			collapsible
			className="w-full"
		>
			<AccordionItem value={ruta.path} className="border-0">
				<AccordionTrigger
					className={cn(
						'hover:bg-sidebar-accent/40 flex w-full items-center gap-2 rounded-sm px-2 py-2 cursor-pointer text-left text-2xl',
						isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
					)}
				>
					<span className={`${ruta.icon}`} />
					<span>{ruta.label}</span>
				</AccordionTrigger>
				<AccordionContent>
					<ul className="ml-auto flex w-[90%] flex-col gap-1">
						{ruta.children.map((child) => {
							const childActive = location.pathname === child.path
							return (
								<li key={child.path}>
									<Button
										variant="ghost"
										onClick={() => navigate(child.path)}
										className={cn(
											'w-full justify-start pl-6 text-2xl cursor-pointer',
											childActive &&
												'bg-sidebar-primary text-sidebar-primary-foreground'
										)}
									>
                                        <span className="icon-[weui--arrow-filled]" />
                                        {child.label}
									</Button>
								</li>
							)
						})}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
