import useAuth from "@components/hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        localStorage.setItem("redirectAfterLogin", location.pathname);
        return <Navigate to="/authentication/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
