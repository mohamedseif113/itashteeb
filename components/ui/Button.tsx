import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "orange";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-1 text-white hover:bg-primary-1/90 focus:ring-primary-1",
  secondary:
    "bg-white text-primary-1 hover:bg-gray-50 focus:ring-primary-1",
  outline:
    "border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 focus:ring-white",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary-1",
  orange:
    "bg-orange-600 text-white shadow-lg hover:scale-[1.01] hover:bg-orange-700 hover:shadow-xl focus:ring-primary-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
