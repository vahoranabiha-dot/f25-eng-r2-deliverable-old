export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          biography: string | null;
        };
      };

      species: {
        Row: {
          id: number;
          author: string;
          scientific_name: string;
          common_name: string | null;
          total_population: number | null;
          kingdom:
            | "Animalia"
            | "Plantae"
            | "Fungi"
            | "Protista"
            | "Archaea"
            | "Bacteria";
          description: string | null;
          image: string | null;
          endangered: boolean;
        };
      };
    };
  };
}
