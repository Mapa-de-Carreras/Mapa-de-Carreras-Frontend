import { Button } from '@components/ui/button'
import { CampoInput } from './CampoInput'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type CampoPasswordProps = {
    label: string,
    nombre: string,
    placeholder?: string,
    obligatorio?: boolean,
    autoComplete?: string,
}

export default function CampoPassword({
    label,
    nombre,
    placeholder,
    obligatorio,
    autoComplete
}: CampoPasswordProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	return (
		<CampoInput
			label={label}
			nombre={nombre}
			type={showPassword ? 'text' : 'password'}
			placeholder={placeholder}
			obligatorio={obligatorio}
            autoComplete={autoComplete}
			adorno={
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-0 cursor-pointer"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
			}
		/>
	)
}
