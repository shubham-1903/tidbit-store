import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "budgerigar"
  | "lovebird"
  | "finch"
  | "neutral"
  | "savings"
  | "bestseller"
  | "advanced";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "default";
}

const variantStyles: Record<BadgeVariant, string> = {
  budgerigar:
    "bg-species-budgie-wash text-species-budgie-base border border-species-budgie-base/20",
  lovebird:
    "bg-species-lovebird-wash text-species-lovebird-base border border-species-lovebird-base/20",
  finch:
    "bg-species-finch-wash text-species-finch-base border border-species-finch-base/20",
  savings:
    "bg-species-budgie-wash text-species-budgie-base font-bold",
  bestseller:
    "bg-species-lovebird-wash text-species-lovebird-base font-semibold",
  advanced:
    "bg-species-finch-wash text-species-finch-base font-semibold",
  neutral:
    "bg-surface-subtle text-text-muted border border-border",
};

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-xs font-label-sm leading-tight",
  default: "px-3 py-1 text-xs font-label-sm leading-normal",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "budgerigar", size = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-jakarta font-semibold tracking-wide whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
