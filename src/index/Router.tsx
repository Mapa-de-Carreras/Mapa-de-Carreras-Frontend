import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../shared/components/App/App";
import PageBase from "../shared/components/PageBase/PageBase";
import InstitutePage from "../modules/academic/InstitutesPage/InstitutesPage";
import DegreePage from "../modules/academic/DegreePage/DegreePage";
import LoginPage from "../modules/users/LoginPage/LoginPage";
import RecoverUsername1 from "../modules/users/RecoverUserName/RecoverUsername1";
import RecoverUsername2 from "../modules/users/RecoverUserName/RecoverUsername2";

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
                   {
                    path: "usuarios",
                    Component: LoginPage,
                },
                {
                    path: "recuperar-nombre-usuario-1",
                    Component:RecoverUsername1,
                },
                 {
                    path: "recuperar-nombre-usuario-2",
                    Component:RecoverUsername2,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}