
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/Hero";
import { IdentitySearch } from "@/components/IdentitySearch";
import { IdentityResults } from "@/components/IdentityResults";
import { SearchAnimation } from "@/components/SearchAnimation";
import { DisplayableIdentity, resolveIdentities } from "@/lib/identity";
import { toast } from "sonner";

const Index = () => {
  const [identities, setIdentities] = useState<DisplayableIdentity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true);
      setError(null);
      
      const results = await resolveIdentities(query);
      
      setIdentities(results);
      setHasSearched(true);
      
      if (results.length === 0) {
        toast.info("No identities found for your search.");
      } else {
        toast.success(`Found ${results.length} identities.`);
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      toast.error("Search failed. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleIdentityClick = (identity: DisplayableIdentity) => {
    toast.info(`Selected ${identity.name}`);
    // You could navigate to a detail page or open a modal here
    console.log("Identity clicked:", identity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SearchAnimation isSearching={isSearching} />
      
      <main className="flex-1">
        <Hero
          title={
            <span>
              AtFinder
            </span>
          }
          description="Search for identities across the MetaNet with our simple and elegant search tool."
        >
          <IdentitySearch 
            onSearch={handleSearch} 
            isSearching={isSearching}
          />
        </Hero>
        
        <Container className="pb-20">
          <IdentityResults
            results={identities}
            loading={isSearching}
            error={error}
            emptyMessage={hasSearched ? "No identities found matching your search." : "Search for an identity to see results."}
            onIdentityClick={handleIdentityClick}
          />
          
          {hasSearched && identities.length > 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              <p>
                This is a demonstration using the BSV Identity SDK. <br />
                Search for identities using names, handles, or paymails.
              </p>
            </div>
          )}
        </Container>
      </main>
      
      <footer className="py-8 border-t">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                AtFinder
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by BSV
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
