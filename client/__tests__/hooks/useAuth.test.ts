"use client";

import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returnerar isLoggedIn false när localStorage är tom", async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(false);
    });
  });

  it("returnerar isLoggedIn true när user finns i localStorage", async () => {
    localStorage.setItem("user", JSON.stringify({ email: "test@test.com", name: "Test" }));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });
  });

  it("signOut tar bort user från localStorage och sätter isLoggedIn till false", async () => {
    localStorage.setItem("user", JSON.stringify({ email: "test@test.com" }));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });

    act(() => {
      result.current.signOut();
    });

    expect(localStorage.getItem("user")).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });
});
