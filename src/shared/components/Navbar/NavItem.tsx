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
import { useEffect, useState } from 'react'

type NavItemProps = {
	ruta: Route,
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void,
}

export default function NavItem({ ruta, collapsed, setCollapsed }: NavItemProps) {
	const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined)
	const location = useLocation()
	const navigate = useNavigate()
	const isActive = (location.pathname === "/" && ruta.label==="Home") || location.pathname.startsWith(`/${ruta.path}`);

	const toggleAccordion = (value: string | undefined) => {
		if (collapsed) {
			setCollapsed(false);
		}
		setOpenAccordion(value);
	};

	useEffect(() => {
		if (collapsed) {
			setOpenAccordion('');
		}
	}, [collapsed]);

	// Si no tiene hijos, es un simple botón de navegación
	if (!ruta.children) {
		openAccordion
		return (
			<li className="w-full">
				<Button
					variant="ghost"
					onClick={() => navigate(ruta.path)}
					className={cn(
						'hover:bg-sidebar-accent/40 flex w-full items-center gap-2 rounded-sm px-2 py-2 cursor-pointer text-xl',
						collapsed ? 'justify-center' : 'justify-start',
						isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
					)}
				>
					<span className={`text-2xl ${ruta.icon}`} />
					{!collapsed && <span>{ruta.label}</span>}
				</Button>
			</li>
		)
	}

	// Si tiene hijos, renderizamos un acordeón
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full"
			value={openAccordion}
			onValueChange={toggleAccordion}
		>
			<AccordionItem value={ruta.path} className="border-0">
				<AccordionTrigger
					className={cn(
						'hover:bg-sidebar-accent/40 flex w-full items-center gap-2 rounded-sm px-2 py-2 cursor-pointer text-xl',
						collapsed ? 'justify-center' : 'text-left',
						isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
					)}
				>
					<span className={`text-2xl ${ruta.icon}`} />
					{!collapsed && <span>{ruta.label}</span>}
				</AccordionTrigger>
				<AccordionContent>
					<ul className="ml-auto my-2 flex w-[90%] flex-col gap-1">
						{ruta.children.map((child) => {
							const childActive = location.pathname === `/${ruta.path}/${child.path}`							
							return (
								<li key={child.path}>
									<Button
										variant="ghost"
										onClick={() => navigate(`${ruta.path}/${child.path}`)}
										className={cn(
											'w-full justify-start pl-6 text-xl cursor-pointer',
											childActive &&
												'bg-sidebar-primary text-sidebar-primary-foreground'
										)}
									>
										{!collapsed && (
											<>
												<span className="icon-[weui--arrow-filled] text-xl" />
												{child.label}
											</>
										)}
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
