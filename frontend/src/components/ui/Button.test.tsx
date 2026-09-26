import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders with default props and text content", () => {
    render(<Button>Add to Cart</Button>);
    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("min-h-[48px]");
  });

  it("applies species variant classes correctly", () => {
    const { rerender } = render(<Button variant="budgerigar">Budgie</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-species-budgie-base");

    rerender(<Button variant="lovebird">Lovebird</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-species-lovebird-base");

    rerender(<Button variant="finch">Finch</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-species-finch-base");
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows loading spinner when isLoading is true", () => {
    render(<Button isLoading>Submitting</Button>);
    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders left and right icons", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Navigate
      </Button>
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });
});
