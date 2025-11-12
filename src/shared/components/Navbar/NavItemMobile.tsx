import { Button } from '@components/ui/button'
import { useLocation, useNavigate } from 'react-router'
import { cn } from '@components/lib/utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@radix-ui/react-accordion'
import { Route } from '@globalTypes/route'
import { useState } from 'react'

type NavItemProps = {
	ruta: Route
}

export default function NavItemMobile({ ruta }: NavItemProps) {
	const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);
	const location = useLocation()
	const navigate = useNavigate()
	const isActive =
		(location.pathname === '/' && ruta.label === 'Home') ||
		location.pathname.startsWith(`/${ruta.path}`)

	if (!ruta.children) {
		return (
			<li className="w-full px-2">
				<Button
					variant="ghost"
					onClick={() => navigate(ruta.path || '')}
					className={cn(
						'w-full justify-start gap-2 py-8 text-2xl',
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
		<Accordion value={openAccordion} onValueChange={setOpenAccordion} type="single" collapsible className="w-full px-2">
			<AccordionItem value={ruta.path || ''} className="border-0">
				<AccordionTrigger
					className={cn(
						'flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-left text-2xl',
						!isActive && 'hover:bg-sidebar-accent/40',
						isActive && 'bg-sidebar-primary text-sidebar-primary-foreground',
						'py-4 text-2xl'
					)}
				>
					<div className="flex w-full flex-row items-center gap-2">
						<span className={`${ruta.icon}`} />
						<span>{ruta.label}</span>
					</div>
					<span
						className={
							openAccordion ? 'icon-[fe--arrow-up]' : 'icon-[fe--arrow-down]'
						}
					/>
				</AccordionTrigger>
				<AccordionContent>
					<ul className="ml-auto flex flex-col gap-1 py-1">
						{ruta.children.map((child) => {
							const childActive = location.pathname === `/${ruta.path}/${child.path}`
							return (
								<li key={child.path}>
									<Button
										variant="ghost"
										onClick={() => navigate(`${ruta.path}/${child.path}`)}
										className={cn(
											'w-full cursor-pointer justify-start py-8 text-2xl',
											childActive &&
												'bg-sidebar-primary text-sidebar-primary-foreground'
										)}
									>
										<span className="icon-[tabler--label] text-2xl" />
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
