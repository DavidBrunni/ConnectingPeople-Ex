import { render, screen } from "@testing-library/react";
import { HowItWorks } from "@/components/HowItWorks";

describe("HowItWorks", () => {
  it("renderar rubrik How it works", () => {
    render(<HowItWorks />);
    expect(screen.getByRole("heading", { level: 2, name: /how it works/i })).toBeInTheDocument();
  });

  it("renderar tre steg: Create your trip, Get matched, Chat and meet up", () => {
    render(<HowItWorks />);
    expect(screen.getAllByRole("heading", { level: 3, name: /create your trip/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { level: 3, name: /get matched with travelers/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { level: 3, name: /chat and meet up/i }).length).toBeGreaterThanOrEqual(1);
  });
});
