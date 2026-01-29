import { render, screen } from "@testing-library/react";
import SearchPage from "@/app/(main)/search/page";

describe("Search page", () => {
  it("renderar rubrik Find your travel tribe", () => {
    render(<SearchPage />);
    expect(screen.getByRole("heading", { level: 1, name: /find your travel tribe/i })).toBeInTheDocument();
  });

  it("har Destination- och Dates-fält", () => {
    render(<SearchPage />);
    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dates/i)).toBeInTheDocument();
  });
});
