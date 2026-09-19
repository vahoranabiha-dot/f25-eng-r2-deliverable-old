"use client";

import Image from "next/image";
import EditSpeciesDialog from "./edit-species-dialog";
import { SpeciesDetailsDialog } from "./species-details-dialog";

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

export default function SpeciesCard({ species, sessionId }: { species: Species; sessionId: string }) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}

      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>

      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      {species.endangered && <p className="mt-2 font-semibold text-red-600">⚠️ Endangered</p>}

      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>

      <div className="mt-3 flex flex-col space-y-2">
        <SpeciesDetailsDialog species={species} />

        {sessionId === species.author && (
          <EditSpeciesDialog species={species} />
        )}
      </div>
    </div>
  );
}
