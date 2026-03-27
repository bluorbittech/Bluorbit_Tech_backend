import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface User {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (data: { fullName: string; email: string; password: string; company?: string }) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Map a Firebase user to our local User shape */
function mapFirebaseUser(fbUser: FirebaseUser, extras?: { company?: string; role?: string }): User {
  return {
    id: fbUser.uid,
    fullName: fbUser.displayName ?? fbUser.email?.split("@")[0] ?? "User",
    email: fbUser.email ?? "",
    company: extras?.company,
    role: extras?.role ?? "Fleet Manager",
    avatar: fbUser.photoURL ?? undefined,
  };
}

// Store extra user fields (company, role) in localStorage keyed by uid
const EXTRAS_KEY = "bluorbit_user_extras";
function getExtras(uid: string): { company?: string; role?: string } {
  try {
    const all = JSON.parse(localStorage.getItem(EXTRAS_KEY) ?? "{}");
    return all[uid] ?? {};
  } catch {
    return {};
  }
}
function saveExtras(uid: string, data: { company?: string; role?: string }) {
  try {
    const all = JSON.parse(localStorage.getItem(EXTRAS_KEY) ?? "{}");
    all[uid] = { ...all[uid], ...data };
    localStorage.setItem(EXTRAS_KEY, JSON.stringify(all));
  } catch { /* noop */ }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const extras = getExtras(fbUser.uid);
        setUser(mapFirebaseUser(fbUser, extras));
      } else {
        setUser(null);
      }
      setReady(true);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string, rememberMe = false) => {
    // Set persistence BEFORE signing in
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const extras = getExtras(cred.user.uid);
    setUser(mapFirebaseUser(cred.user, extras));
  }, []);

  const signUp = useCallback(async (data: { fullName: string; email: string; password: string; company?: string }) => {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    // Set display name in Firebase
    await firebaseUpdateProfile(cred.user, { displayName: data.fullName });
    // Store company locally
    if (data.company) saveExtras(cred.user.uid, { company: data.company, role: "Fleet Manager" });
    setUser(mapFirebaseUser(cred.user, { company: data.company, role: "Fleet Manager" }));
  }, []);

  const signOut = useCallback(() => {
    firebaseSignOut(auth);
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    const fbUser = auth.currentUser;
    if (!fbUser) return;

    // Update Firebase display name / photo if provided
    const firebaseUpdates: { displayName?: string; photoURL?: string } = {};
    if (data.fullName) firebaseUpdates.displayName = data.fullName;
    if (data.avatar) firebaseUpdates.photoURL = data.avatar;
    if (Object.keys(firebaseUpdates).length > 0) {
      firebaseUpdateProfile(fbUser, firebaseUpdates).catch(console.error);
    }

    // Update extras
    if (data.company !== undefined || data.role !== undefined) {
      saveExtras(fbUser.uid, { company: data.company, role: data.role });
    }

    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const fbUser = auth.currentUser;
    if (!fbUser || !fbUser.email) throw new Error("No authenticated user.");
    // Re-authenticate before changing password
    const credential = EmailAuthProvider.credential(fbUser.email, currentPassword);
    await reauthenticateWithCredential(fbUser, credential);
    await firebaseUpdatePassword(fbUser, newPassword);
  }, []);

  // Don't render children until Firebase resolves auth state
  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut, updateProfile, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
