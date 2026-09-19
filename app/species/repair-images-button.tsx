"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { getWikipediaSpecies } from "@/lib/services/species-wikipedia";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Species {
  id: number;
  scientific_name: string;
  image: string | null;
}

export default function RepairImagesButton({ species }: { species: Species[] }) {
  const [isRepairing, setIsRepairing] = useState(false);
  const router = useRouter();

  const repairImages = async () => {
    setIsRepairing(true);

    const supabase = createBrowserSupabaseClient();

    const wikipediaSpecies = species.filter((animal) => animal.image?.includes("wikimedia.org"));

    let fixed = 0;
    let failed = 0;

    for (const animal of wikipediaSpecies) {
      try {
        const wikipediaData = await getWikipediaSpecies(animal.scientific_name);

        if (!wikipediaData.image) {
          failed++;
          continue;
        }

        const { error } = await supabase.from("species").update({ image: wikipediaData.image }).eq("id", animal.id);

        if (error) {
          failed++;
          continue;
        }

        fixed++;
      } catch {
        failed++;
      }
    }

    setIsRepairing(false);
    router.refresh();

    toast({
      title: "Image repair complete",
      description: `Fixed ${fixed} image${fixed === 1 ? "" : "s"}${
        failed > 0 ? `, ${failed} could not be updated` : ""
      }.`,
    });
  };

  return (
    <Button type="button" variant="outline" onClick={() => void repairImages()} disabled={isRepairing}>
      {isRepairing ? "Repairing images..." : "Repair Wikipedia Images"}
    </Button>
  );
}
