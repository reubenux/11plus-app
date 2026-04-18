import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { mergeFromCloud } from "../utils/cloudScores";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(undefined); // undefined = loading
  const [redirectError, setRedirectError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      if (u) mergeFromCloud(u.uid).catch(console.error);
    });
    return unsub;
  }, []);

  async function signInWithGoogle() {
    setRedirectError(null);
    const provider = new GoogleAuthProvider();
    // Always use popup — redirect flow breaks on localhost and many mobile
    // browsers due to third-party cookie restrictions.
    await signInWithPopup(auth, provider);
  }

  async function signInWithEmail(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUpWithEmail(email, password, name) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{
      user,
      redirectError,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut: handleSignOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
