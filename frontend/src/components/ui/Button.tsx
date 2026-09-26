import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonSpeciesVariant = "budgerigar" | "lovebird" | "finch";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | ButtonSpeciesVariant;
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-species-budgie-base text-surface hover:bg-species-budgie-deepen active:bg-species-budgie-deepen shadow-sm",
  budgerigar:
    "bg-species-budgie-base text-surface hover:bg-species-budgie-deepen active:bg-species-budgie-deepen shadow-sm",
  lovebird:
    "bg-species-lovebird-base text-surface hover:bg-species-lovebird-hover active:bg-species-lovebird-hover shadow-sm",
  finch:
    "bg-species-finch-base text-surface hover:bg-species-finch-hover active:bg-species-finch-hover shadow-sm",
  secondary:
    "bg-surface-subtle text-text-primary hover:bg-border active:bg-border",
  outline:
    "border border-border bg-surface text-text-primary hover:bg-surface-subtle active:bg-surface-subtle",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface-subtle active:bg-surface-subtle",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "min-h-[48px] h-12 px-6 text-sm font-label-lg",
  sm: "min-h-[40px] h-10 px-4 text-xs font-label-sm",
  lg: "min-h-[56px] h-14 px-8 text-base font-label-lg",
  icon: "min-h-[48px] h-12 w-12 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-jakarta font-semibold tracking-wide transition-colors duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-species-budgie-base focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" role="status" aria-label="Loading" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
