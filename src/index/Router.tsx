import App from "@components/App/App";
import DegreePage from "@academic/DegreePage/DegreePage";
import InstitutePage from "@academic/InstitutesPage/InstitutesPage";
import LoginPage from "@users/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: App,
            children: [
                {
                    index: true,
                    Component: Home,
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