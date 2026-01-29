import { render, screen } from "@testing-library/react";
import MessagesPage from "@/app/(main)/messages/page";

describe("Messages page", () => {
  it("renderar rubrik Messages", () => {
    render(<MessagesPage />);
    expect(screen.getByRole("heading", { level: 1, name: /messages/i })).toBeInTheDocument();
  });

  it("har länk till View matches", () => {
    render(<MessagesPage />);
    expect(screen.getByRole("link", { name: /view matches/i })).toHaveAttribute("href", "/matches");
  });
});
