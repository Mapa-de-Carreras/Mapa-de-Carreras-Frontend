import { Outlet } from "react-router";
import Navbar from "@components/Navbar/Navbar";
import NavbarMobile from "@components/Navbar/NavbarMobile";

export default function App() {
    return (
        <div className="flex flex-col sm:flex-row w-full h-full">
            <Navbar />
            <NavbarMobile />
            <Outlet />
        </div>
    );
}1