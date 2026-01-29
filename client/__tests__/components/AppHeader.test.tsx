import { render, screen } from "@testing-library/react";
import { AppHeader } from "@/components/AppHeader";

describe("AppHeader", () => {
  it("renderar Connecting People och navigationslänkar", () => {
    render(<AppHeader />);
    expect(screen.getByRole("link", { name: /connecting people/i })).toBeInTheDocument();
    // Flera länkar (desktop + mobil) – ta första träff
    expect(screen.getAllByRole("link", { name: /home/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /search/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /forums/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /events/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /profile/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("har Sign In eller Sign out-knapp", () => {
    render(<AppHeader />);
    const signInLinks = screen.queryAllByRole("link", { name: /sign in/i });
    const signOutButtons = screen.queryAllByRole("button", { name: /sign out/i });
    expect(signInLinks.length > 0 || signOutButtons.length > 0).toBe(true);
  });
});
