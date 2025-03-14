
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

const containerSizes = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

export function Container({
  as: Component = "div",
  size = "xl",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 md:px-6 lg:px-8",
        containerSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
