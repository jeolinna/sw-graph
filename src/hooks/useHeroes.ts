import { useQuery } from "@tanstack/react-query";
import { fetchHeroes } from "../api/heroes";
import type { SwapiResponse } from "../types/shared";
import type { Hero } from "../types/hero";

export const useHeroes = (page: number = 1) => {
  return useQuery<SwapiResponse<Hero>, Error>({
    queryKey: ["heroes", page],
    queryFn: () => fetchHeroes(page),
    placeholderData: (previousData) => previousData,
  });
};
