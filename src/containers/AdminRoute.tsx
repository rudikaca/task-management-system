import { Navigate } from "react-router-dom";
import React, {ReactElement} from "react";
import {paths} from "@/constants/paths";

interface AdminRouteProps {
    children: ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }): ReactElement => {

    const loggedIn = false;
    const userRole = "ADMIN";

    if (loggedIn && userRole === "ADMIN") {
        return children;
    }

    return <Navigate to={paths.login} replace />;
}

export default AdminRoute
