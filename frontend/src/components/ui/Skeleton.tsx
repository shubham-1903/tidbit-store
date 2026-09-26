import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular" | "card";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  ...props
}) => {
  const variantStyles = {
    text: "h-4 w-full rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
    card: "h-64 w-full rounded-xl border border-border shadow-level1",
  };

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        "animate-pulse bg-surface-subtle",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
