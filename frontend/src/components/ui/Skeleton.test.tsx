import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton component", () => {
  it("renders with status role and loading label", () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole("status", { name: /loading/i });
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("bg-surface-subtle");
  });

  it("applies circular and card variants properly", () => {
    const { rerender } = render(<Skeleton variant="circular" className="h-12 w-12" />);
    let skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("rounded-full");

    rerender(<Skeleton variant="card" />);
    skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("rounded-xl");
    expect(skeleton).toHaveClass("shadow-level1");
  });
});
