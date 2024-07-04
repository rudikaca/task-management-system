import { Navigate } from "react-router-dom";
import {ReactNode} from "react";
import { paths } from "../constants/paths";

type Props = {
    children: ReactNode,
}

const AuthRoute = ({ children }: Props) => {
    const loggedIn = false;

    if (!loggedIn) {
        return children;
    }

    return <Navigate to={paths.dashboard} replace />;
}

export default AuthRoute
