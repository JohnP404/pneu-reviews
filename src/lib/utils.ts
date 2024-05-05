import { type ClassValue, clsx } from "clsx";
import { getAuth } from "firebase/auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function getIdToken() {
    const token = await getAuth().currentUser?.getIdToken();
    return token;
}
