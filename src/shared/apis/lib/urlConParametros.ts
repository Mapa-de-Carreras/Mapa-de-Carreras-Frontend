export default function urlConParametros(baseUrl: string, parametros: any = {}): string {
	let url = baseUrl

	if (!baseUrl) {
		console.error('❌ Error: La URL base es undefined')
		return ''
	}

	const parametrosEnUrl = url.match(/{\w+}/g)

	if (!!parametrosEnUrl) {
		parametrosEnUrl.forEach((param) => {
			const key = param.replace(/[{}]/g, '')
			if (key === 'queryParams') {
				return
			}
			if (parametros[key] !== undefined) {
				url = url.replace(param, parametros[key])
			} else {
				console.warn(`⚠️ Advertencia: Falta el parámetro '${key}' para la URL.`)
			}
		})
	}

	return url
}
