
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

interface IdentitySearchProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export function IdentitySearch({
  onSearch,
  isSearching = false,
  className,
  ...props
}: IdentitySearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-morphism rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-xl">
          <div className="flex items-center p-1">
            <div className="flex items-center justify-center w-12 h-12 text-muted-foreground">
              <SearchIcon 
                className={cn(
                  "h-5 w-5 transition-opacity", 
                  isSearching ? "opacity-50 animate-pulse-subtle" : "opacity-80"
                )} 
              />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by attributes, or identity key"
              className="flex-1 h-12 bg-transparent border-0 focus:ring-0 focus:outline-none text-base md:text-lg px-2"
              disabled={isSearching}
            />
            <div className="p-1">
              <button
                type="submit"
                disabled={!query.trim() || isSearching}
                className={cn(
                  "h-10 px-5 rounded-xl transition-all duration-200 font-medium text-primary-foreground",
                  "bg-primary hover:bg-primary/90 focus:bg-primary/90",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background"
                )}
              >
                {isSearching ? (
                  <span className="flex items-center">
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                  </span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
