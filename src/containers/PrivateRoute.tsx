import { Navigate } from "react-router-dom";
import {ReactNode} from "react";
import { paths } from "../constants/paths";

type Props = {
    children: ReactNode,

}

const PrivateRoute = ({ children }: Props) => {
    const loggedIn = false;
    const userRole = "ADMIN";

    if (loggedIn && (userRole === "ADMIN" || userRole === "USER")) {
        return children;
    }

    return <Navigate to={paths.login} replace />;
}

export default PrivateRoute
