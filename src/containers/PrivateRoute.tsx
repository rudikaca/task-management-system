import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }): ReactElement => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;