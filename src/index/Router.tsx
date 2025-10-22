import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../shared/components/App/App";
import PageBase from "../shared/components/PageBase/PageBase";
import InstitutePage from "../modules/academic/InstitutesPage/InstitutesPage";
import DegreePage from "../modules/academic/DegreePage/DegreePage";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: App,
            children: [
                {
                    index: true, 
                    element: <PageBase>
                        <h2>Página Inicio</h2>
                    </PageBase>
                },
                {
                    path: "carreras",
                    Component: DegreePage,
                },
                {
                    path: "institutos",
                    Component: InstitutePage,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}