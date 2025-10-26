
import App from "@components/App/App";
import DegreePage from "@academic/DegreePage/DegreePage";
import InstitutePage from "@academic/InstitutesPage/InstitutesPage";
import LoginPage from "@users/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
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
                    element:
                        <PageBase>
                            <div className="flex min-h-svh flex-col items-center justify-center">

                                <BotonSimple onClick={() => console.log(" Soy un botón de ui.shadcn")}>Click me</BotonSimple>
                                
                            </div>
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

                    children: [
                        {
                            path: "login",
                            Component: LoginPage,
                        },
                        {
                            path: "inicio",
                            Component: LogoutPage,
                        },

                        {
                            path: "recuperar-nombre-usuario-1",
                            Component: RecoverUsername1,
                        },
                        {
                            path: "recuperar-nombre-usuario-2",
                            Component: RecoverUsername2,
                        },
                        {
                            path: "recuperar-contraseña-1",
                            Component: RecoverPassword1,
                        },
                        {
                            path: "recuperar-contraseña-2",
                            Component: RecoverPassword2,
                        },
                        {
                            path: "recuperar-contraseña-3",
                            Component: RecoverPassword3,

                        },
                        {
                            path: "inicio",
                            Component: LogoutPage,

                        },

                    ]
                },

            ],
        },
    ]
    const router = createBrowserRouter(rutas);

    return <RouterProvider router={router} />;
}