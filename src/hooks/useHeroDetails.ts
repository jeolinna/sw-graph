import { useQuery } from "@tanstack/react-query";
import { fetchHeroByUrl } from "../api/heroes";
import { fetchFilmByUrl } from "../api/films";
import { fetchStarshipByUrl } from "../api/starships";
import type { AggregatedHeroDetails } from "../types/shared";
import type { Hero } from "../types/hero";

/**
 * Aggregates hero, movie, and ship data into a single object.
 * Executes parallel queries for optimal performance.
 */
const fetchHeroDetailsAggregated = async (
  heroUrl: string
): Promise<AggregatedHeroDetails> => {
  const hero: Hero = await fetchHeroByUrl(heroUrl);

  console.log("Hero data:", hero);
  console.log("Hero films IDs:", hero.films);
  console.log("Hero starships IDs:", hero.starships);

  const films = await Promise.all(
    hero.films.map((id) => fetchFilmByUrl(id.toString()))
  );

  const starships = await Promise.all(
    hero.starships.map((id) => fetchStarshipByUrl(id.toString()))
  );

  console.log("Fetched films:", films);
  console.log("Fetched starships:", starships);

  return {
    hero,
    films,
    starships,
  };
};

/**
 * Custom hook for getting detailed information about the hero
 * Uses React Query for caching and managing the query state
 */
export const useHeroDetails = (heroUrl: string) => {
  return useQuery<AggregatedHeroDetails, Error>({
    queryKey: ["heroDetails", heroUrl],
    queryFn: () => fetchHeroDetailsAggregated(heroUrl),
    enabled: !!heroUrl,
    staleTime: 5 * 60 * 1000,
  });
};
