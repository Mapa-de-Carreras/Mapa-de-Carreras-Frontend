export type SubRoute = {
	path: string,
	label: string,
};

export type Route = {
	path: string,
	label: string,
	icon: string,
	children?: SubRoute[],
};

