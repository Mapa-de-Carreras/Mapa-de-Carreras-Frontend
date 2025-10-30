
import App from "@components/App/App";
import DegreePage from "@academic/DegreePage/DegreePage";
import InstitutePage from "@academic/InstitutesPage/InstitutesPage";
import LoginPage from "@users/LoginPage/LoginPage";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./Home";
import RecoverUsername1 from "../modules/users/RecoverUserName/RecoverUsername1";
import RecoverUsername2 from "../modules/users/RecoverUserName/RecoverUsername2";
import RecoverPassword1 from "../modules/users/RecoverPassword/RecoverPassword1";
import RecoverPassword2 from "../modules/users/RecoverPassword/RecoverPassword2";
import RecoverPassword3 from "../modules/users/RecoverPassword/RecoverPassword3";
import LogoutPage from "../modules/users/LogoutPage/LogoutPage";
import ProtectedRoute from "@components/Providers/ProtectRouter";
import GuestRoute from "@components/Providers/GuestRoute";
import UserDetail from "../modules/users/UserDetail/UserDetail";
import UserCreate from "../modules/users/UserCreate/UserCreate";


export default function Router() {
    const rutas = [
        {
            path: "authentication", 
            element: <GuestRoute />,
            children: [
                {
                    path: "login",
                    Component: LoginPage,
                },
                {
                    path: "reuser1",
                    Component: RecoverUsername1,
                },
                {
                    path: "reuser2",
                    Component: RecoverUsername2,
                },
                {
                    path: "repass1",
                    Component: RecoverPassword1,
                },
                {
                    path: "repass2",
                    Component: RecoverPassword2,
                },
                {
                    path: "repass3",
                    Component: RecoverPassword3,
                },
            ]
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    Component: App,
                    children: [
                        { index: true, Component: Home },
                        { path: "carreras", Component: DegreePage },
                        { path: "institutos", Component: InstitutePage },
                        {
                            path: "usuarios",
                            Component: LogoutPage,
                        },
                        { path: "usuarios/detail", Component: UserDetail },
                        { path: "usuarios/create", Component: UserCreate },
                    ],
                },
            ],
        },
        {
            path: "*",
            element: <div>Error</div>,
        },
    ];
    const router = createBrowserRouter(rutas);

    return <RouterProvider router={router} />;
}