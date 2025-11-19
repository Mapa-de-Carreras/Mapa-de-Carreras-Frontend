import { isFuture } from "date-fns"
import { isAtLeastYears, isValidDDMMYYYY } from "./fechas"

/**
 * Validadores para React Hook Form.
 * Devuelve un objeto para usar en rules.validate
 */
export function getFechaValidators(obligatorio: boolean) {
	return {
		formato: (value?: string) => {
			if (!value) {
				return obligatorio ? 'Este campo es obligatorio' : true
			}
			if (!isValidDDMMYYYY(value)) {
				return 'Fecha inválida. Usa un día y mes correctos (dd/mm/aaaa)'
			}
			return true
		},
		noFuturo: (value?: string) => {
			if (!value) return true
			if (isFuture(value)) {
				return 'La fecha no puede ser futura'
			}
			return true
		},
		mayorDe18: (value?: string) => {
			if (!value) return true
			if (!isAtLeastYears(value, 18)) {
				return 'Debes ser mayor de 18 años'
			}
			return true
		},
	}
}
