import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/home/Dashboard";
import Sample from "./pages/home/Sample";
import {PrivateRoute, AuthRoute} from "@/containers";
import {Login, Signup} from "@/pages/auth";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>,
            },
            {
                path: "login",
                element: <AuthRoute>
                    <Login />
                </AuthRoute>,
            },
            {
                path: "signup",
                element: <AuthRoute>
                    <Signup />
                </AuthRoute>,
            },
            {
                path: "sample",
                element: <PrivateRoute>
                    <Sample />
                </PrivateRoute>,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
], {
    basename: global.basename
})
