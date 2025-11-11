export type Route = {
	navbar?: boolean
	path?: string
	index?: boolean
	element?: React.ReactNode
	Component?: React.ComponentType<any>
	label?: string
	icon?: string
	menu?: boolean
	children?: Route[]
}
