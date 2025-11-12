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
import { Route } from '@globalTypes/route'

type NavItemProps = {
	ruta: Route
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}

export default function NavItem({ ruta, collapsed, setCollapsed }: NavItemProps) {
	const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined)
	const location = useLocation()
	const navigate = useNavigate()
	const isActive =
		(location.pathname === '/' && ruta.label === 'Home') ||
		location.pathname.startsWith(`/${ruta.path}`)

	const toggleAccordion = (value: string | undefined) => {
		if (collapsed) {
			setCollapsed(false)
		}
		setOpenAccordion(value)
	}

	useEffect(() => {
		if (collapsed) {
			setOpenAccordion('')
		}
	}, [collapsed])

	// Si no tiene hijos, es un simple botón de navegación
	if (!ruta.children) {
		openAccordion
		return (
			<li className="w-full">
				<Button
					variant="ghost"
					onClick={() => navigate(ruta.path || '/')}
					className={cn(
						'hover:bg-sidebar-accent/40 flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-xl',
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
			<AccordionItem value={ruta.path || ''} className="border-0">
				<AccordionTrigger
					className={cn(
						'flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-2 text-xl',
						!isActive && 'hover:bg-sidebar-accent/40',
						collapsed ? 'justify-center' : 'text-left',
						isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
					)}
				>
					<div className="flex items-center gap-2">
						<span className={`text-2xl ${ruta.icon} shrink-0`} />
						{!collapsed && <span>{ruta.label}</span>}
					</div>
					{!collapsed && (
						<span
							className={
								openAccordion ? 'icon-[fe--arrow-up]' : 'icon-[fe--arrow-down]'
							}
						/>
					)}
				</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col gap-1 py-2">
						{ruta.children.map((child) => {
							const childActive = location.pathname === `/${ruta.path}/${child.path}`
							return (
								<li key={child.path}>
									<Button
										variant="ghost"
										onClick={() => navigate(`${ruta.path}/${child.path}`)}
										className={cn(
											'w-full cursor-pointer justify-start text-xl',
											childActive &&
												'bg-sidebar-primary text-sidebar-primary-foreground'
										)}
									>
										{!collapsed && (
											<>
												<span className="icon-[tabler--label] text-xl" />
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
