import type { Film } from "./film";
import type { Hero } from "./hero";
import type { Starship } from "./starship";

export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AggregatedHeroDetails {
  hero: Hero;
  films: Film[];
  starships: Starship[];
}
