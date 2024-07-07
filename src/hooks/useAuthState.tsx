import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase-config';
import { useAppDispatch } from '@/store';
import {AuthActions} from "@/store/slices/authSlice";
import {getUserRole} from "@/services/authService";
import {AuthState, UserRole} from "@/models/types";

export function useAuthState(): AuthState {
    const dispatch = useAppDispatch();
    const [authState, setAuthState] = useState<AuthState>({
        loading: true,
        loggedIn: false,
        user: null
    });

    useEffect(() => {
        const handleAuthStateChange = async (user: User | null) => {
            try {
                if (user) {
                    const role = await getUserRole(user.uid);
                    const userData = {
                        id: user.uid,
                        email: user.email || '',
                        role: role as UserRole
                    };
                    dispatch(AuthActions.setUser(userData));
                    setAuthState({
                        loading: false,
                        loggedIn: true,
                        user: userData
                    });
                } else {
                    dispatch(AuthActions.logoutUser());
                    setAuthState({
                        loading: false,
                        loggedIn: false,
                        user: null
                    });
                }
            } catch (error) {
                console.error('Error handling auth state change:', error);
                setAuthState({
                    loading: false,
                    loggedIn: false,
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