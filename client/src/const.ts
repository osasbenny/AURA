import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

export const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export async function startLogin() {
  await signInWithPopup(firebaseAuth, googleProvider);
}

export async function logoutFirebase() {
  await signOut(firebaseAuth);
}
