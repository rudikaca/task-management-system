import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import {Toaster} from "react-hot-toast";
import {useAppDispatch} from "@/store";
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth"
import {auth} from "@/config/firebase-config";
import {AuthActions, UserRole} from "@/store/slices/authSlice";
import {getUserRole} from "@/services/authService";

export default function App() {
    const dispatch = useAppDispatch();
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            // console.log("user", user);
            if (user) {
                const role = await getUserRole(user.uid);
                dispatch(AuthActions.setUser({
                    email: user.email || '',
                    role: role as UserRole
                }));
            } else {
                dispatch(AuthActions.logoutUser());
            }
            setUserLoading(false);
        });
        return () => unsubscribe();
    }, [dispatch]);

    if (userLoading) {
        return <h1 className="flex min-h-screen justify-center items-center">Loading...</h1>;
    }

    return (
        <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster
                position="top-center"
                gutter={12} containerStyle={{margin: "8px"}}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-700)",
                    }
                }}
            />
        </ThemeProvider>
    )
}
