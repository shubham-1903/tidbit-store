import * as React from "react";
import { cn } from "@/lib/utils";

export type FilterChipSpecies = "budgerigar" | "lovebird" | "finch";

export interface FilterChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  species?: FilterChipSpecies;
}

const selectedSpeciesStyles: Record<FilterChipSpecies, string> = {
  budgerigar:
    "bg-species-budgie-wash text-species-budgie-base border-[1.5px] border-species-budgie-base font-semibold",
  lovebird:
    "bg-species-lovebird-wash text-species-lovebird-base border-[1.5px] border-lovebird-base border-species-lovebird-base font-semibold",
  finch:
    "bg-species-finch-wash text-species-finch-base border-[1.5px] border-species-finch-base font-semibold",
};

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      className,
      selected = false,
      species = "budgerigar",
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-4 py-2 font-jakarta text-xs font-label-sm tracking-wide transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-species-budgie-base focus-visible:ring-offset-2",
          selected
            ? selectedSpeciesStyles[species]
            : "bg-surface text-text-muted border border-border hover:bg-surface-subtle hover:text-text-primary",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilterChip.displayName = "FilterChip";
