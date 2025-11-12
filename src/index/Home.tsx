import PageBase from '@components/PageBase/PageBase'
import HomeCard from './components/HomeCard'
import useRoutes from '@hooks/useRoutes'

export default function Home() {
	const rutas = useRoutes();

	return (
		<PageBase className="p-4">
			{rutas
				.filter((section) => section.menu)
				.map((section) => (
					<div key={`home-${section.path}`} className="mb-6">
						<h2 className="my-2 text-3xl">{section.label}</h2>
						<div className="grid w-full grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2">
							{section.children
								?.filter((children) => children.menu)
								.map((child) => (
									<HomeCard
										key={`home-${child.path}`}
										route={`/${section.path}/${child.path}`}
										icon={child.icon || section.icon || ''}
									>
										{child.label}
									</HomeCard>
								))}
						</div>
					</div>
				))}
		</PageBase>
	)
}
