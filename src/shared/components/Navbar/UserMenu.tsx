import useAuth from '@components/hooks/useAuth'
import { useTheme } from '@hooks/useTheme'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router'

type DropDownItemProps = {
	icon: string
	children: ReactNode
	onClick?: () => void
	className?: string
	path?: string
}

function DropDownItem({ icon, children, onClick, className, path }: DropDownItemProps) {
	const navigate = useNavigate()

	const irA = () => {
		if (path) navigate(path)
	}

	return (
		<DropdownMenuItem
		className={`flex cursor-pointer items-center gap-2 rounded-sm p-2 hover:bg-sidebar-accent/20 ${className ?? ''}`}
		onClick={onClick || irA}
		>
		<span className={icon} />
		{children}
		</DropdownMenuItem>
	)
}

type UserMenuProps = {
	collapsed: boolean,
	side: 'top' | 'bottom' | 'left' | 'right',
	align: "center" | "start" | "end",
	className?: string,
}

export function UserMenu({ collapsed, side, align, className }: UserMenuProps) {
	const navigate = useNavigate()
	const { logout } = useAuth()
	const { theme, toggleTheme } = useTheme();
	const { user: usuario } = useAuth();

	const handleIrPerfil = () => {
		const id = usuario?.id;
		navigate(`/perfil/${id}`);
	};


	const closeSesion = async () => {
		try {
			await logout()
		} finally {
			navigate('/authentication/login')
		}
	}

	return (
		<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<button
			className={`
				hover:bg-sidebar-accent/20 flex cursor-pointer
				items-center gap-2 rounded-md p-2 transition-colors
				${collapsed ? "justify-center" : ""}
				${className ?? "w-full"}
			`}
			>
			<Avatar className='h-8 w-8 border border-sidebar-border shadow-sm'>
				{!collapsed && (
				<>
					<AvatarImage
					src={usuario?.avatar || "/avatars/default.png"}
					alt={usuario ? `${usuario.first_name} ${usuario.last_name}` : "Usuario"}
					/>
					<AvatarFallback>
					{usuario ? `${usuario.first_name?.[0]}${usuario.last_name?.[0]}` : "??"}
					</AvatarFallback>
					<span className="icon-[lucide--chevron-up-down] text-muted-foreground" />
				</>
				)}
			</Avatar>
			{!collapsed && <span>{usuario ? `${usuario.first_name} ${usuario.last_name}` : "Cargando..."}</span>}
			</button>
		</DropdownMenuTrigger>

		<DropdownMenuContent
			side={side}
			align={align}
			className="bg-sidebar border-sidebar-border w-60 border p-4 text-xl"
		>
			<DropdownMenuLabel className="flex items-center gap-2">
			<img
				src={usuario?.avatar || "/avatars/default.png"}
				alt={usuario ? `${usuario.first_name} ${usuario.last_name}` : "Usuario"}
				className="h-8 w-8 rounded-full object-cover"
			/>
			<div>
				<p className="text-sidebar-foreground font-medium">
				{usuario ? `${usuario.first_name} ${usuario.last_name}` : "Cargando..."}
				</p>
				<p className="text-muted-foreground break-all">
				{usuario?.email || "No disponible"}
				</p>
			</div>
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropDownItem icon="icon-[lucide--user]" onClick={handleIrPerfil}>
			Perfil
			</DropDownItem>
			<DropDownItem
				icon={theme.includes("dark") ? "icon-[mynaui--sun-solid]" : "icon-[lucide--moon]"}
				onClick={toggleTheme}
			>
				Tema {theme.includes("dark") ? "Claro" : "Oscuro"}
			</DropDownItem>
			<DropDownItem
			icon="icon-[lucide--log-out]"
			className="text-destructive focus:text-destructive"
			onClick={closeSesion}
			>
			Cerrar Sesión
			</DropDownItem>
		</DropdownMenuContent>
		</DropdownMenu>
	)
	}