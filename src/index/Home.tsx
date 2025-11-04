import PageBase from "@components/PageBase/PageBase";
import { appRoutes } from "@services/routes/routes";
import HomeCard from "./components/HomeCard";

export default function Home() {
  return (
    <PageBase className="p-4">
      {appRoutes.filter(section => section.menu).map(section => (
        <div key={section.path} className="mb-6">
          <h2 className="text-3xl my-2">{section.label}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-items-stretch">
            {section.children?.filter(children => children.menu).map(child => (
              <HomeCard
                key={child.path}
                route={`/${section.path}/${child.path}`}
                icon={child.icon || section.icon || ""}
              >
                {child.label}
              </HomeCard>
            ))}
          </div>
        </div>
      ))}
    </PageBase> 
  );
}
