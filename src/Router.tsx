import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/home/Dashboard";
import Reports from "./pages/home/Reports";
import {PrivateRoute, AuthRoute, AdminRoute} from "@/containers";
import {Login, Signup} from "@/pages/auth";
import {paths} from "@/constants/paths";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: `${paths.dashboard}`,
                element: <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>,
            },
            {
                path: `${paths.reports}`,
                element: <AdminRoute>
                    <Reports />
                </AdminRoute>,
            },
        ],
    },
    {
        path: `${paths.login}`,
        element: <AuthRoute>
            <Login />
        </AuthRoute>,
    },
    {
        path: `${paths.signup}`,
        element: <AuthRoute>
            <Signup />
        </AuthRoute>,
    },
    {
        path: "*",
        element: <NoMatch />,
    },
], {
    basename: global.basename
})
