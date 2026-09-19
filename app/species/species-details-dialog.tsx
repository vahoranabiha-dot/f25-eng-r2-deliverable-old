"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

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

export function SpeciesDetailsDialog({ species }: { species: Species }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="mt-3 w-full" onClick={(e) => e.stopPropagation()}>
          Learn More
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[500px] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.scientific_name}</DialogTitle>

          {species.common_name && <DialogDescription>{species.common_name}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Kingdom</p>
            <p>{species.kingdom}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground">Total Population</p>
            <p>{species.total_population?.toLocaleString() ?? "Unknown"}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground">Conservation Status</p>
            <p className={species.endangered ? "font-semibold text-red-600" : ""}>
              {species.endangered ? "⚠️ Endangered" : "Not currently marked as endangered"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground">Description</p>
            <p className="whitespace-pre-line">{species.description ?? "No description available."}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
