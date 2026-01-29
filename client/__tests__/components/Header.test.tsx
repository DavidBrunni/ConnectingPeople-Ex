import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header (landing)", () => {
  it("renderar Connecting People och Sign In", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /connecting people/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /sign in/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("har ankarlänkar How it works, Destinations, Community", () => {
    render(<Header />);
    const howItWorks = screen.getAllByRole("link", { name: /how it works/i })[0];
    const destinations = screen.getAllByRole("link", { name: /destinations/i })[0];
    const community = screen.getAllByRole("link", { name: /community/i })[0];
    expect(howItWorks).toHaveAttribute("href", "#how-it-works");
    expect(destinations).toHaveAttribute("href", "#destinations");
    expect(community).toHaveAttribute("href", "#community");
  });
});
