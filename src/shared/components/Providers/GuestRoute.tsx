import useAuth from "@components/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const GuestRoute: React.FC = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;
