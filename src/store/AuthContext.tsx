import { auth } from "@/app/firebase";
import { getUser } from "@/firebase/read";
import { writeUser } from "@/firebase/write";

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

export const AuthContext = createContext({});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<any>();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const firebaseUserData = await getUser(currentUser?.uid);
				setIsAdmin(firebaseUserData.isAdmin);
				setUser(currentUser);
			} else {
				setUser(null);
			}
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
				writeUser(user);
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
