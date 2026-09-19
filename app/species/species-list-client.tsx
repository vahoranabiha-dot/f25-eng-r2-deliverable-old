"use client";

import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import SpeciesCard from "./species-card";

interface Species {
  id: number;
  author: string;
  scientific_name: string;
  common_name: string | null;
  total_population: number | null;
  kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
  description: string | null;
  image: string | null;
  endangered: boolean;
}

export default function SpeciesListClient({ species, sessionId }: { species: Species[]; sessionId: string }) {
  const [search, setSearch] = useState("");
  const [showEndangeredOnly, setShowEndangeredOnly] = useState(false);

  const filteredSpecies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return species.filter((item) => {
      const scientificName = item.scientific_name.toLowerCase();
      const commonName = item.common_name?.toLowerCase() ?? "";

      const matchesSearch = !query || scientificName.includes(query) || commonName.includes(query);

      const matchesEndangered = !showEndangeredOnly || item.endangered;

      return matchesSearch && matchesEndangered;
    });
  }, [search, showEndangeredOnly, species]);

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by scientific or common name..."
          className="w-full max-w-md"
        />

        <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-sm">
          <input
            type="checkbox"
            checked={showEndangeredOnly}
            onChange={(event) => setShowEndangeredOnly(event.target.checked)}
            className="h-4 w-4"
          />
          Endangered only
        </label>
      </div>

      {filteredSpecies.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">No species found matching your filters.</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredSpecies.map((species) => (
            <SpeciesCard key={species.id} species={species} sessionId={sessionId} />
          ))}
        </div>
      )}
    </>
  );
}
