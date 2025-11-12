import { AuthContext } from "@components/Providers/AuthProvider";
import { AuthContextType } from "@services/auth/types";
import { useContext } from "react";

export default function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}