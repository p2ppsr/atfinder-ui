
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DisplayableIdentity } from "@/lib/identity";
import { ExternalLink } from "lucide-react";

interface IdentityResultsProps {
  results: DisplayableIdentity[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
  onIdentityClick?: (identity: DisplayableIdentity) => void;
}

export function IdentityResults({
  results,
  loading = false,
  error = null,
  emptyMessage = "No results found",
  onIdentityClick,
  className,
  ...props
}: IdentityResultsProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof IdentityResultsProps>) {
  return (
    <div 
      className={cn(
        "w-full mt-12",
        loading && "opacity-70",
        className
      )} 
      {...props}
    >
      {error ? (
        <div className="text-center p-8 rounded-xl bg-destructive/10 text-destructive">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className="animate-pulse glass-morphism rounded-xl p-6 h-40"
            >
              <div className="flex space-x-4">
                <div className="rounded-full bg-secondary h-14 w-14"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-5 bg-secondary rounded w-3/4"></div>
                  <div className="h-4 bg-secondary rounded w-1/2"></div>
                  <div className="h-4 bg-secondary rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center p-12">
          <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((identity, index) => (
            <div 
              key={index} 
              className="glass-morphism card-hover rounded-xl overflow-hidden cursor-pointer"
              style={{ 
                animationDelay: `${index * 75}ms`,
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards'
              }}
              onClick={() => onIdentityClick && onIdentityClick(identity)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    {identity.avatarURL ? (
                      <AvatarImage src={identity.avatarURL} alt={identity.name} />
                    ) : (
                      <AvatarFallback>
                        {identity.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium leading-tight">{identity.name || "Unknown Name"}</h3>
                    <p className="text-sm text-muted-foreground">{identity.abbreviatedKey || "Unknown Key"}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    {identity.badgeIconURL && (
                      <img 
                        src={identity.badgeIconURL} 
                        alt="Badge" 
                        className="w-4 h-4" 
                      />
                    )}
                    <p className="text-sm text-muted-foreground">{identity.badgeLabel}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <a 
                    href={identity.badgeClickURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full text-sm py-2 px-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus-ring justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn More <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
