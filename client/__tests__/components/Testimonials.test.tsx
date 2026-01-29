import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/components/Testimonials";

describe("Testimonials", () => {
  it("renderar rubrik What travelers say", () => {
    render(<Testimonials />);
    expect(screen.getByRole("heading", { level: 2, name: /what travelers say/i })).toBeInTheDocument();
  });

  it("renderar minst ett testimonial med namn", () => {
    render(<Testimonials />);
    expect(screen.getByText(/sarah chen/i)).toBeInTheDocument();
  });
});
