import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(main)/login/page";

describe("Login page", () => {
  it("renderar Log in och Sign up-flikar", () => {
    render(<LoginPage />);
    expect(screen.getAllByRole("button", { name: /log in/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("har e-post- och lösenordsfält", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("har Log in-knapp i formuläret", () => {
    render(<LoginPage />);
    expect(screen.getAllByRole("button", { name: /log in/i }).length).toBeGreaterThanOrEqual(1);
  });
});
