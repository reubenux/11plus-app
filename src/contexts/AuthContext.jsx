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
    // Handle redirect-based sign-in result (fallback from popup on some browsers)
    getRedirectResult(auth).catch(() => {});

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
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      // Popup blocked or not supported — fall back to redirect
      if (e.code === "auth/popup-blocked" || e.code === "auth/popup-cancelled" || e.code === "auth/cancelled-popup-request") {
        await signInWithRedirect(auth, provider);
      } else {
        throw e;
      }
    }
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
