import App from "@components/App/App";
import PageBase from "@components/PageBase/PageBase";
import DegreePage from "@academic/DegreePage/DegreePage";
import InstitutePage from "@academic/InstitutesPage/InstitutesPage";
import { Button } from "@components/Botones/Button";
import LoginPage from "@management/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


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
                                <Button onClick={() => console.log(" Soy un botón de ui.shadcn")}>Click me</Button>
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
                    Component: LoginPage,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}