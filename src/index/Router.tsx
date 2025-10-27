import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../shared/components/App/App";
import PageBase from "../shared/components/PageBase/PageBase";
import InstitutePage from "../modules/academic/InstitutesPage/InstitutesPage";
import DegreePage from "../modules/academic/DegreePage/DegreePage";
import LoginPage from "../modules/users/LoginPage/LoginPage";
import RecoverUsername1 from "../modules/users/RecoverUserName/RecoverUsername1";
import RecoverUsername2 from "../modules/users/RecoverUserName/RecoverUsername2";
import RecoverPassword1 from "../modules/users/RecoverPassword/RecoverPassword1";
import RecoverPassword2 from "../modules/users/RecoverPassword/RecoverPassword2";
import RecoverPassword3 from "../modules/users/RecoverPassword/RecoverPassword3";
import LogoutPage from "../modules/users/LogoutPage/LogoutPage";

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
                    path: "inicio",
                    Component: LogoutPage,
                },

                {
                    path: "recuperar-nombre-usuario-1",
                    Component:RecoverUsername1,
                },
                 {
                    path: "recuperar-nombre-usuario-2",
                    Component:RecoverUsername2,
                },
                 {
                    path: "recuperar-contraseña-1",
                    Component:RecoverPassword1,
                },
                {
                    path: "recuperar-contraseña-2",
                    Component:RecoverPassword2,
                },
                {
                    path: "recuperar-contraseña-3",
                    Component:RecoverPassword3,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}