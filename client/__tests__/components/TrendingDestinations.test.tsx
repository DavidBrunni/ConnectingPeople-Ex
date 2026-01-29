import { render, screen } from "@testing-library/react";
import { TrendingDestinations } from "@/components/TrendingDestinations";

describe("TrendingDestinations", () => {
  it("renderar rubrik Trending destinations", () => {
    render(<TrendingDestinations />);
    expect(screen.getByRole("heading", { level: 2, name: /trending destinations/i })).toBeInTheDocument();
  });

  it("renderar minst en destination (Tokyo)", () => {
    render(<TrendingDestinations />);
    expect(screen.getAllByRole("heading", { level: 3, name: /tokyo/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("renderar Bali, Paris, Barcelona", () => {
    render(<TrendingDestinations />);
    expect(screen.getAllByText(/bali/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/paris/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/barcelona/i).length).toBeGreaterThanOrEqual(1);
  });
});
