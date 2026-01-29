import { render, screen } from "@testing-library/react";
import EventsPage from "@/app/(main)/events/page";

describe("Events page", () => {
  it("renderar rubrik Meetup events", () => {
    render(<EventsPage />);
    expect(screen.getByRole("heading", { level: 1, name: /meetup events/i })).toBeInTheDocument();
  });

  it("har länk till Search trips", () => {
    render(<EventsPage />);
    expect(screen.getByRole("link", { name: /search trips/i })).toHaveAttribute("href", "/search");
  });
});
