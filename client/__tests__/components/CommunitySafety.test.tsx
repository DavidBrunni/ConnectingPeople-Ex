import { render, screen } from "@testing-library/react";
import { CommunitySafety } from "@/components/CommunitySafety";

describe("CommunitySafety", () => {
  it("renderar rubrik Community & Safety", () => {
    render(<CommunitySafety />);
    expect(screen.getByRole("heading", { level: 2, name: /community & safety/i })).toBeInTheDocument();
  });

  it("renderar tre funktioner: Verified travelers, Secure messaging, Meetup events", () => {
    render(<CommunitySafety />);
    expect(screen.getAllByRole("heading", { level: 3, name: /verified travelers/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { level: 3, name: /secure messaging/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("heading", { level: 3, name: /meetup events/i }).length).toBeGreaterThanOrEqual(1);
  });
});
