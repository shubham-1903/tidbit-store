import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantityStepper } from "./QuantityStepper";

describe("QuantityStepper component", () => {
  it("renders with given value and tabular-nums", () => {
    render(<QuantityStepper value={2} onChange={() => {}} />);
    const valueDisplay = screen.getByText("2");
    expect(valueDisplay).toBeInTheDocument();
    expect(valueDisplay).toHaveClass("tabular-nums");
  });

  it("increments value on plus click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<QuantityStepper value={1} min={1} max={5} onChange={handleChange} />);
    const plusButton = screen.getByRole("button", { name: /increase quantity/i });
    await user.click(plusButton);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("decrements value on minus click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<QuantityStepper value={3} min={1} max={5} onChange={handleChange} />);
    const minusButton = screen.getByRole("button", { name: /decrease quantity/i });
    await user.click(minusButton);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("disables decrement when value is at min", () => {
    render(<QuantityStepper value={1} min={1} max={5} onChange={() => {}} />);
    const minusButton = screen.getByRole("button", { name: /decrease quantity/i });
    expect(minusButton).toBeDisabled();
  });

  it("disables increment when value is at max", () => {
    render(<QuantityStepper value={5} min={1} max={5} onChange={() => {}} />);
    const plusButton = screen.getByRole("button", { name: /increase quantity/i });
    expect(plusButton).toBeDisabled();
  });

  it("meets the 44px min tap target constraint", () => {
    render(<QuantityStepper value={1} onChange={() => {}} />);
    const minusButton = screen.getByRole("button", { name: /decrease quantity/i });
    const plusButton = screen.getByRole("button", { name: /increase quantity/i });
    // h-11 is 44px
    expect(minusButton).toHaveClass("h-11", "w-11");
    expect(plusButton).toHaveClass("h-11", "w-11");
  });
});
