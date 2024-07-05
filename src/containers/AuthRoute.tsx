import React, { ReactElement } from 'react';
import { Navigate } from "react-router-dom";
import { paths } from "@/constants/paths";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface AuthRouteProps {
    children: ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }): ReactElement => {
    const {loggedIn} = useSelector((state: RootState) => state.auth);

    if (!loggedIn) {
        return children;
    }

    return <Navigate to={paths.dashboard} replace />;
}

export default AuthRoute;