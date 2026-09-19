import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesListClient from "./species-list-client";

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

export default async function SpeciesList() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const sessionId = session.user.id;

  const { data: species, error } = await supabase.from("species").select("*").order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const typedSpecies = (species ?? []) as Species[];

  return (
    <>
      <Separator className="my-4" />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionId} />
      </div>

      <SpeciesListClient species={typedSpecies} sessionId={sessionId} />
    </>
  );
}
