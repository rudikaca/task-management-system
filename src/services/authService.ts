import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { auth } from "@/config/firebase-config";
import {UserAuth} from "@/store/slices/authSlice";
import {getFirestore, doc, getDoc} from "firebase/firestore";

const db = getFirestore();

export type FirebaseError = {
    code: number,
    message: string
}

export async function getUserRole(uid: string): Promise<string> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
        return userDoc.data().role || 'USER';
    }
    return 'USER';
}

export const login = async (user: UserAuth, rejectWithValue: any) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
        const role = await getUserRole(userCredential.user.uid);

        // passing serializable data to Redux, which resolve the serialization errors
        return {
            // ...userCredential.user,
            email: userCredential.user.email,
            displayName: role
        };
    } catch (err) {
        return rejectWithValue((err as FirebaseError).message as string)
    }
}

export const register = async (user: UserAuth, rejectWithValue: any) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        await updateProfile(userCredential.user, {
            displayName: user.role
        })
        return {
            ...userCredential.user,
            role: userCredential.user.displayName
        };
    } catch (err) {
        return rejectWithValue((err as FirebaseError).message as string)
    }

}