
import React from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchAnimationProps {
  isSearching: boolean;
}

export function SearchAnimation({ isSearching }: SearchAnimationProps) {
  if (!isSearching) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="glass-morphism rounded-2xl p-8 shadow-lg text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary/40" />
          </div>
          <div className="relative flex items-center justify-center">
            <Search className="h-8 w-8 text-primary animate-pulse-subtle" />
            <Sparkles className="h-4 w-4 text-primary/80 animate-pulse absolute -top-1 -right-1" />
          </div>
        </div>
        <p className="text-lg font-medium">Searching MetaNet</p>
        <p className="text-sm text-muted-foreground mt-2">Discovering identities...</p>
      </div>
    </div>
  );
}
