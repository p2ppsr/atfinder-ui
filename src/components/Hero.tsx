
import React from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Hero({
  title,
  description,
  children,
  className,
  ...props
}: HeroProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof HeroProps>) {
  return (
    <div
      className={cn(
        "relative py-20 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/3 animate-float animation-delay-2000" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-secondary text-primary animate-fade-in">
            AtFinder
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 animate-slide-down">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance animate-fade-in opacity-90">
              {description}
            </p>
          )}
          
          <div className="animate-slide-up">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
