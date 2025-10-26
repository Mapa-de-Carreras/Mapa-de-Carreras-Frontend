import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "@/shared/components/App/App";
import PageBase from "@/shared/components/PageBase/PageBase";
import InstitutePage from "@/modules/academic/InstitutesPage/InstitutesPage";
import DegreePage from "@/modules/academic/DegreePage/DegreePage";
import LoginPage from "@/modules/management/LoginPage/LoginPage";
import { Button } from "@/components/ui/button";

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