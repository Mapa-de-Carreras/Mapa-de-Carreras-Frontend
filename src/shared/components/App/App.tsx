import { Outlet } from "react-router";
import Navbar from "@components/Navbar/Navbar";

export default function App() {
    return (
        <div className="">
            <Navbar sitio="Inicio"/>
            <Outlet />
        </div>
    );
}