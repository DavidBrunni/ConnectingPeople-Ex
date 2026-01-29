"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && !!localStorage.getItem("user");
    const id = requestAnimationFrame(() => setIsLoggedIn(stored));
    return () => cancelAnimationFrame(id);
  }, []);

  function signOut() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return { isLoggedIn, signOut };
}
