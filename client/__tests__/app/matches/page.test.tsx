import { render, screen } from "@testing-library/react";
import MatchesPage from "@/app/(main)/matches/page";

describe("Matches page", () => {
  it("renderar rubrik Your matches", () => {
    render(<MatchesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /your matches/i })).toBeInTheDocument();
  });

  it("har länk till Search", () => {
    render(<MatchesPage />);
    expect(screen.getByRole("link", { name: /go to search/i })).toHaveAttribute("href", "/search");
  });
});
