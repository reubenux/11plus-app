import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    // Process any pending Google redirect result first
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) console.log("Redirect sign-in successful:", result.user.email);
      })
      .catch((e) => console.error("getRedirectResult error:", e.code));

    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (u) await mergeFromCloud(u.uid);
      } catch (e) {
        console.error("mergeFromCloud error:", e);
      } finally {
        setUser(u ?? null);
      }
    });
    return unsub;
  }, []);

  async function signInWithGoogle() {
    await signInWithRedirect(auth, new GoogleAuthProvider());
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
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
