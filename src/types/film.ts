export interface Film {
  id?: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: (string | number)[];
  starships: (string | number)[];
  vehicles: (string | number)[];
  characters: (string | number)[];
  planets: (string | number)[];
  url: string;
}
