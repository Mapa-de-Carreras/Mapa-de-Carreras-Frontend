export function isValidDDMMYYYY(value: string): boolean {
	if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false

	const [dayStr, monthStr, yearStr] = value.split("/")
	const day = Number(dayStr)
	const month = Number(monthStr)
	const year = Number(yearStr)

	if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
		return false
	}

	if (month < 1 || month > 12) return false
	if (day < 1) return false

	const isLeapYear =
		(year % 4 === 0 && year % 100 !== 0) ||
		year % 400 === 0

	const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	const maxDay = daysInMonth[month - 1]

	return day <= maxDay
}

export function parseDate(value: string | undefined): Date | undefined {
	if (!value || !isValidDDMMYYYY(value)) return undefined

	const [dayStr, monthStr, yearStr] = value.split("/")
	const day = Number(dayStr)
	const month = Number(monthStr)
	const year = Number(yearStr)

	return new Date(year, month - 1, day)
}

export function formatDate(date: Date | undefined): string {
	if (!date) return ""
	const d = String(date.getDate()).padStart(2, "0")
	const m = String(date.getMonth() + 1).padStart(2, "0")
	const y = date.getFullYear()
	return `${d}/${m}/${y}`
}

export function isFuture(value: string | undefined): boolean {
	const d = parseDate(value)
	if (!d) return false
	const hoy = new Date()
	hoy.setHours(0, 0, 0, 0)
	return d > hoy
}

export function isAtLeastYears(value: string | undefined, years: number): boolean {
	const d = parseDate(value)
	if (!d) return false
	const hoy = new Date()
	const limite = new Date(hoy.getFullYear() - years, hoy.getMonth(), hoy.getDate())
	return d <= limite
}