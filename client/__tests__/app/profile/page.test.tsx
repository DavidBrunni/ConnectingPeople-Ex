import { render, screen } from "@testing-library/react";
import ProfilePage from "@/app/(main)/profile/page";

describe("Profile page", () => {
  it("renderar rubrik Your profile", () => {
    render(<ProfilePage />);
    expect(screen.getByRole("heading", { level: 1, name: /your profile/i })).toBeInTheDocument();
  });

  it("har länk till Search trips", () => {
    render(<ProfilePage />);
    const link = screen.getAllByRole("link", { name: /search trips/i })[0];
    expect(link).toHaveAttribute("href", "/search");
  });

  it("har länk till View matches", () => {
    render(<ProfilePage />);
    const link = screen.getAllByRole("link", { name: /view matches/i })[0];
    expect(link).toHaveAttribute("href", "/matches");
  });
});
