import App from "@components/App/App";
import PageBase from "@components/PageBase/PageBase";
import DegreePage from "@academic/DegreePage/DegreePage";
import InstitutePage from "@academic/InstitutesPage/InstitutesPage";
import LoginPage from "@users/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import BotonSimple from "@components/Botones/BotonSimple";


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
                    ]
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}