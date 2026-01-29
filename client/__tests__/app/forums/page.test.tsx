import { render, screen } from "@testing-library/react";
import ForumsPage from "@/app/(main)/forums/page";

describe("Forums page", () => {
  it("renderar rubrik Destination forums", () => {
    render(<ForumsPage />);
    expect(screen.getByRole("heading", { level: 1, name: /destination forums/i })).toBeInTheDocument();
  });

  it("har länk tillbaka till home", () => {
    render(<ForumsPage />);
    const link = screen.getAllByRole("link", { name: /back to home/i })[0];
    expect(link).toHaveAttribute("href", "/");
  });
});
