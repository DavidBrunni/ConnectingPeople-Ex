import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it("renderar rubrik och undertitel", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /find your travel tribe/i })).toBeInTheDocument();
    expect(screen.getByText(/connect with like-minded solo travelers/i)).toBeInTheDocument();
  });

  it("har länkar Create a Trip och Explore Travelers till /search", () => {
    render(<Hero />);
    const createTrip = screen.getAllByRole("link", { name: /create a trip/i })[0];
    const explore = screen.getAllByRole("link", { name: /explore travelers/i })[0];
    expect(createTrip).toHaveAttribute("href", "/search");
    expect(explore).toHaveAttribute("href", "/search");
  });
});
