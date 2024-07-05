import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import {paths} from "@/constants/paths";
import {RootState} from "@/store";
import {useSelector} from "react-redux";

interface PrivateRouteProps {
    children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }): ReactElement => {
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    if (!loggedIn) {
        return <Navigate to={paths.login} replace />;
    }

    return children;
};

export default PrivateRoute;