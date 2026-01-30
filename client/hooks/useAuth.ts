"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasAuth =
      typeof window !== "undefined" &&
      (!!localStorage.getItem("token") || !!localStorage.getItem("user"));
    const id = requestAnimationFrame(() => setIsLoggedIn(!!hasAuth));
    return () => cancelAnimationFrame(id);
  }, []);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  return { isLoggedIn, signOut };
}
