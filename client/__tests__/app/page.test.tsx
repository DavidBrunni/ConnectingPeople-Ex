import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renderar Hero-rubrik Find your travel tribe", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /find your travel tribe/i })).toBeInTheDocument();
  });

  it("renderar How it works, Trending destinations, Community & Safety", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 2, name: /how it works/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { level: 2, name: /trending destinations/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { level: 2, name: /community & safety/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("har hjälpknapp med aria-label Help Center", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /help center/i })).toBeInTheDocument();
  });
});
