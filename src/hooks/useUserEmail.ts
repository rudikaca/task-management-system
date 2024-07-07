import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export function useUserEmail(userId: string | null) {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUserEmail = async () => {
            if (!userId) {
                setUserEmail(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const db = getFirestore();
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setUserEmail(userDoc.data().email);
                    console.log(userDoc.data())
                } else {
                    setUserEmail(null);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
                setUserEmail(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEmail();
    }, [userId]);

    return { userEmail, loading, error };
}