import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { mergeFromCloud } from "../utils/cloudScores";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) await mergeFromCloud(u.uid);
      setUser(u ?? null);
    });
    return unsub;
  }, []);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      console.error("Sign-in failed:", e);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
