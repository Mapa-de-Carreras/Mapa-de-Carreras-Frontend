import { Route } from '@globalTypes/route'
import { createContext } from 'react'
import { RouteObject, useRoutes } from 'react-router'

type RouterMapaContext = {
	rutas: Route[]
	rutasMenu: Route[]
}

export const RouterContext = createContext<RouterMapaContext>({
	rutas: [],
	rutasMenu: [],
})

type RouterMapaProps = {
	rutas: Route[]
}

export default function RouterMapa({ rutas }: RouterMapaProps) {
	const ruta = useRoutes(rutas as RouteObject[]);

	const ordenarRutasPorLongitud = (a: Route, b: Route) => {
		const keyA = a.headerkey || '';
		const keyB = b.headerkey || '';
		return keyB.length - keyA.length; 
	};

	const filtrarRutasAplicacion = () => {
		const nav = rutas.find((route) => route.navbar)
		if (!nav || !nav.children) return [] as Route[]

		const app = nav.children[0]
		if (!app || !app.children) return [] as Route[]

		const rutasOrdenadas = app.children.map((ruta) => {
			if (Array.isArray(ruta.children)) {
				const hijosOrdenados = [...ruta.children].sort(ordenarRutasPorLongitud);

				return {
					...ruta,
					children: hijosOrdenados,
				};
			}
			return ruta;
		});

		return rutasOrdenadas;
	};

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

	const rutasFiltradas = {
		rutas: filtrarRutasAplicacion(),
		rutasMenu: filtro(),
	}

	return <RouterContext.Provider value={rutasFiltradas}>{ruta}</RouterContext.Provider>
}
