import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

type StarBorderSize = "sm" | "md" | "lg";
type StarBorderVariant = "solid" | "ghost";

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  glow?: boolean
  size?: StarBorderSize
  variant?: StarBorderVariant
  className?: string
  contentClassName?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  glow = true,
  size = "md",
  variant = "solid",
  contentClassName,
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "hsl(var(--foreground))"
  const sizeClasses = size === "sm"
    ? "text-sm py-2 px-4"
    : size === "lg"
      ? "text-base py-4 px-7"
      : "text-sm py-3 px-5";
  const variantClasses = variant === "ghost"
    ? "backdrop-blur-sm bg-foreground/5 dark:bg-foreground/10 border-transparent ring-[1.5px] ring-inset ring-border/55 dark:ring-border/45"
    : "bg-gradient-to-b from-background/90 to-muted/90 border-transparent ring-2 ring-inset ring-border/55 dark:ring-border/45";

  return (
    <Component 
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px] transition-colors cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        glow && "sb-glow",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 pointer-events-none",
          "opacity-20 dark:opacity-70" 
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 pointer-events-none",
          "opacity-20 dark:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-1 border text-foreground text-center rounded-[20px] leading-none",
        sizeClasses,
        variantClasses,
        // Subtle lift like macOS without border distortion
        "transition-colors active:opacity-95",
        variant === "solid" && "hover:shadow-[0_10px_26px_-14px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_10px_26px_-14px_rgba(0,0,0,0.36)] hover:ring-border/60 dark:hover:ring-border/50 hover:from-background/95 hover:to-muted/80 dark:hover:from-background/80 dark:hover:to-muted/70",
        variant === "ghost" && "hover:shadow-[0_8px_22px_-12px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_8px_22px_-12px_rgba(0,0,0,0.28)] hover:ring-border/60 dark:hover:ring-border/50",
        // subtle state changes for ghost visibility
        variant === "ghost" && "transition-colors duration-200 hover:bg-foreground/7 dark:hover:bg-foreground/14 hover:border-foreground/30 dark:hover:border-foreground/40",
        // subtle color lift for solid variant (left CTA) without layout shift
        variant === "solid" && "duration-200 hover:from-background/95 hover:to-muted/80 dark:hover:from-background/80 dark:hover:to-muted/70",
        contentClassName
      )}>
        {children}
      </div>
    </Component>
  )
}