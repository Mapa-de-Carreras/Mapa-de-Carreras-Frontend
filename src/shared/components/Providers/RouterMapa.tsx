import { Route } from '@globalTypes/route'
import { createContext } from 'react'
import { RouteObject, useRoutes } from 'react-router'

export const RouterContext = createContext<Route[]>([])

type RouterMapaProps = {
	rutas: Route[]
}

export default function RouterMapa({ rutas }: RouterMapaProps) {
	const ruta = useRoutes(rutas as RouteObject[])

	const filtro = () => {
		const nav = rutas.find((route) => route.navbar)
		if (!nav || !nav.children) return []

		const app = nav.children[0]
		if (!app || !app.children) return []

		const filtrar = (rutas: Route[] = []) => rutas.filter((ruta) => ruta.menu)

		return filtrar(app.children).map((ruta) => ({
			...ruta,
			children: Array.isArray(ruta.children) ? filtrar(ruta.children) : undefined,
		}))
	}

	const rutasFiltradas = filtro()

	return <RouterContext.Provider value={rutasFiltradas}>{ruta}</RouterContext.Provider>
}
