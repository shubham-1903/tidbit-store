import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge component", () => {
  it("renders with default props", () => {
    render(<Badge>Budgerigar</Badge>);
    const badge = screen.getByText("Budgerigar");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("bg-species-budgie-wash");
    expect(badge).toHaveClass("text-species-budgie-base");
  });

  it("applies species variants correctly", () => {
    const { rerender } = render(<Badge variant="lovebird">Lovebird & Cockatiel</Badge>);
    let badge = screen.getByText("Lovebird & Cockatiel");
    expect(badge).toHaveClass("bg-species-lovebird-wash");
    expect(badge).toHaveClass("text-species-lovebird-base");

    rerender(<Badge variant="finch">Finch & Canary</Badge>);
    badge = screen.getByText("Finch & Canary");
    expect(badge).toHaveClass("bg-species-finch-wash");
    expect(badge).toHaveClass("text-species-finch-base");

    rerender(<Badge variant="savings">Save $5.00</Badge>);
    badge = screen.getByText("Save $5.00");
    expect(badge).toHaveClass("bg-species-budgie-wash");
    expect(badge).toHaveClass("text-species-budgie-base");
  });

  it("applies size styles correctly", () => {
    render(<Badge size="sm">Small Tag</Badge>);
    expect(screen.getByText("Small Tag")).toHaveClass("px-2.5");
  });
});
