interface WikipediaPage {
  title?: string;
  extract?: string;
  thumbnail?: {
    source?: string;
  };
}

interface WikipediaResponse {
  query?: {
    pages?: Record<string, WikipediaPage>;
  };
}

export interface WikipediaSpecies {
  common_name: string | null;
  description: string | null;
  image: string | null;
}

export async function getWikipediaSpecies(scientificName: string): Promise<WikipediaSpecies> {
  const title = scientificName.trim();

  if (!title) {
    throw new Error("Please enter a scientific name first.");
  }

  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=800&redirects=1&titles=${encodeURIComponent(
    title,
  )}&origin=*`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Wikipedia request failed.");
  }

  const data = (await response.json()) as WikipediaResponse;

  const pages = data.query?.pages;

  if (!pages) {
    throw new Error(`No Wikipedia page found for "${title}".`);
  }

  const pageId = Object.keys(pages)[0];

  if (!pageId || pageId === "-1") {
    throw new Error(`No Wikipedia page found for "${title}".`);
  }

  const page = pages[pageId];

  if (!page) {
    throw new Error(`No Wikipedia page found for "${title}".`);
  }

  return {
    common_name: page.title ?? null,
    description: page.extract ?? null,
    image: page.thumbnail?.source ?? null,
  };
}
