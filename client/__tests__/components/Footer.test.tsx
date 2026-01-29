import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("renderar Connecting People och produktlänkar", () => {
    render(<Footer />);
    // Logo-länken (för att undvika flera träffar – "Connecting People" finns även i copyright)
    expect(screen.getByRole("link", { name: /connecting people/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /how it works/i })).toHaveAttribute(
      "href",
      "/#how-it-works"
    );
    expect(screen.getByRole("link", { name: /destinations/i })).toHaveAttribute(
      "href",
      "/#destinations"
    );
    expect(screen.getByRole("link", { name: /community/i })).toHaveAttribute(
      "href",
      "/#community"
    );
  });

  it("renderar copyright med aktuellt år", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it("har länkar till Terms, Privacy, Cookies", () => {
    render(<Footer />);
    // Exakt text så vi inte träffar "Terms of Service" / "Privacy Policy" i support-kolumnen
    expect(screen.getByRole("link", { name: "Terms" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cookies" })).toBeInTheDocument();
  });
});
