import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../shared/components/App/App";
import PageBase from "../shared/components/PageBase/PageBase";

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
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}