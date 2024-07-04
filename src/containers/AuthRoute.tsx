import React, { ReactElement } from 'react';
import { Navigate } from "react-router-dom";
import { paths } from "@/constants/paths";

interface AuthRouteProps {
    children: ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }): ReactElement => {
    const loggedIn = false; // Replace with your actual authentication logic

    if (!loggedIn) {
        return children;
    }

    return <Navigate to={paths.dashboard} replace />;
}

export default AuthRoute;