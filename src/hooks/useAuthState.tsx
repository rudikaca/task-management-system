import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase-config';
import { useAppDispatch } from '@/store';
import {AuthActions, UserRole} from "@/store/slices/authSlice";
import {getUserRole} from "@/services/authService";

interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: { email: string; role: UserRole } | null;
}

export function useAuthState(): AuthState {
    const dispatch = useAppDispatch();
    const [authState, setAuthState] = useState<AuthState>({
        isLoading: true,
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        const handleAuthStateChange = async (user: User | null) => {
            try {
                if (user) {
                    const role = await getUserRole(user.uid);
                    const userData = {
                        email: user.email || '',
                        role: role as UserRole
                    };
                    dispatch(AuthActions.setUser(userData));
                    setAuthState({
                        isLoading: false,
                        isAuthenticated: true,
                        user: userData
                    });
                } else {
                    dispatch(AuthActions.logoutUser());
                    setAuthState({
                        isLoading: false,
                        isAuthenticated: false,
                        user: null
                    });
                }
            } catch (error) {
                console.error('Error handling auth state change:', error);
                setAuthState({
                    isLoading: false,
                    isAuthenticated: false,
                    user: null
                });
            }
        };

        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
        return () => unsubscribe();
    }, [dispatch]);

    return authState;
}

export default useAuthState;