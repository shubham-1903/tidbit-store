import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  className,
  ariaLabel = "Quantity",
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const isMin = value <= min;
  const isMax = value >= max;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center rounded-full bg-surface-subtle border border-border p-1 select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || isMin}
        aria-label="Decrease quantity"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-colors cursor-pointer",
          "hover:bg-surface active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-species-budgie-base",
          "disabled:cursor-not-allowed disabled:text-text-subtle disabled:hover:bg-transparent disabled:active:scale-100"
        )}
      >
        <Minus className="h-4 w-4" />
      </button>

      <span
        aria-live="polite"
        className="min-w-[2.5rem] text-center font-inter font-medium text-sm text-text-primary tabular-nums"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || isMax}
        aria-label="Increase quantity"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-colors cursor-pointer",
          "hover:bg-surface active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-species-budgie-base",
          "disabled:cursor-not-allowed disabled:text-text-subtle disabled:hover:bg-transparent disabled:active:scale-100"
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
