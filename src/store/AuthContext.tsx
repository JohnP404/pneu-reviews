import { auth } from "@/app/firebase";
import { getUser, uploadUser } from "@/lib/axios";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type Context = {
    user: User;
    isAdmin: boolean;
    googleSignIn: () => Promise<void>;
    googleSignOut: () => Promise<void>;
};

const ADM_EMAIL1 = process.env.NEXT_PUBLIC_ADMIN_EMAIL1;
const ADM_EMAIL2 = process.env.NEXT_PUBLIC_ADMIN_EMAIL2;
const ADM_EMAIL3 = process.env.NEXT_PUBLIC_ADMIN_EMAIL3;

export const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (
                currentUser?.email === ADM_EMAIL1 ||
                currentUser?.email === ADM_EMAIL2 ||
                currentUser?.email === ADM_EMAIL3
            ) {
                setIsAdmin(true);
            }
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [user]);

    async function googleSignIn() {
        try {
            const provider = new GoogleAuthProvider();
            let { user } = await signInWithPopup(auth, provider);

            setUser(user);
            const userExists = await getUser(user.uid);

            if (!userExists) {
                uploadUser(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function googleSignOut() {
        try {
            await signOut(auth);
            setIsAdmin(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, isAdmin, googleSignIn, googleSignOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const Auth = () => useContext(AuthContext) as Context;
