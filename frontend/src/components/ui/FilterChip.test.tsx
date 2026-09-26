import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterChip } from "./FilterChip";

describe("FilterChip component", () => {
  it("renders in unselected state by default", () => {
    render(<FilterChip>1 kg</FilterChip>);
    const chip = screen.getByRole("button", { name: "1 kg" });
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAttribute("aria-pressed", "false");
    expect(chip).toHaveClass("bg-surface");
    expect(chip).toHaveClass("text-text-muted");
    expect(chip).toHaveClass("border-border");
  });

  it("renders in selected state with species base and wash", () => {
    const { rerender } = render(
      <FilterChip selected species="budgerigar">
        3 kg
      </FilterChip>
    );
    let chip = screen.getByRole("button", { name: "3 kg" });
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(chip).toHaveClass("bg-species-budgie-wash");
    expect(chip).toHaveClass("text-species-budgie-base");
    expect(chip).toHaveClass("border-[1.5px]");

    rerender(
      <FilterChip selected species="lovebird">
        3 kg
      </FilterChip>
    );
    chip = screen.getByRole("button", { name: "3 kg" });
    expect(chip).toHaveClass("bg-species-lovebird-wash");
    expect(chip).toHaveClass("text-species-lovebird-base");

    rerender(
      <FilterChip selected species="finch">
        3 kg
      </FilterChip>
    );
    chip = screen.getByRole("button", { name: "3 kg" });
    expect(chip).toHaveClass("bg-species-finch-wash");
    expect(chip).toHaveClass("text-species-finch-base");
  });

  it("handles click callback", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<FilterChip onClick={handleClick}>5 kg</FilterChip>);
    await user.click(screen.getByRole("button", { name: "5 kg" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
