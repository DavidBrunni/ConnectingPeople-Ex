import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renderar med text och default variant/size", () => {
    render(<Button>Klicka här</Button>);
    const btn = screen.getByRole("button", { name: /klicka här/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("bg-cyan-500");
    expect(btn).toHaveClass("h-10");
  });

  it("renderar med variant outline och size lg", () => {
    render(
      <Button variant="outline" size="lg">
        Större knapp
      </Button>
    );
    const btn = screen.getByRole("button", { name: /större knapp/i });
    expect(btn).toHaveClass("border-2");
    expect(btn).toHaveClass("h-12");
  });

  it("använder custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    const btn = screen.getByRole("button", { name: /test/i });
    expect(btn).toHaveClass("custom-class");
  });

  it("kan vara disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
  });

  it("anropar onClick vid klick", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Klicka</Button>);
    await user.click(screen.getByRole("button", { name: /klicka/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
