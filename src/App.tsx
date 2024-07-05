import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import {Toaster} from "react-hot-toast";

export default function App() {
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
