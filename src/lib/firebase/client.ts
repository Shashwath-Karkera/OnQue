import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY.trim().length > 0
  );
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function getFirebaseClientAuth(): Auth | null {
  if (typeof window === "undefined") return null;

  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }

  if (!auth && app) {
    auth = getAuth(app);
  }

  return auth;
}

/**
 * Initiates the Google Sign-In popup via Firebase Auth
 * Returns the verified ID Token and user profile
 */
export async function signInWithGooglePopup(): Promise<{
  idToken: string;
  email: string;
  displayName: string;
  photoURL?: string;
}> {
  const clientAuth = getFirebaseClientAuth();
  if (!clientAuth) {
    throw new Error(
      "Firebase Google Sign-In is not yet configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY and related credentials in .env.local"
    );
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result: UserCredential = await signInWithPopup(clientAuth, provider);
  const idToken = await result.user.getIdToken();

  return {
    idToken,
    email: result.user.email || "",
    displayName: result.user.displayName || "Google User",
    photoURL: result.user.photoURL || undefined,
  };
}
