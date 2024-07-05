import { Navigate } from "react-router-dom";
import React, {ReactElement} from "react";
import {paths} from "@/constants/paths";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface AdminRouteProps {
    children: ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }): ReactElement => {
    const { loggedIn, user } = useSelector((state: RootState) => state.auth);

    if (loggedIn && user?.role === "ADMIN") {
        return children;
    }

    if (!loggedIn) {
        return <Navigate to={paths.login} replace />;
    }

    return <Navigate to={paths.dashboard} replace />;
}

export default AdminRoute
