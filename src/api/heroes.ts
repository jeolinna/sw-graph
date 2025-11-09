import type { Hero } from "../types/hero";
import type { SwapiResponse } from "../types/shared";
import { fetchData } from "./client";

const BASE_URL = "https://sw-api.starnavi.io";

export const fetchHeroes = async (
  page: number
): Promise<SwapiResponse<Hero>> => {
  return fetchData<SwapiResponse<Hero>>(`${BASE_URL}/people/?page=${page}`);
};

export const fetchHeroByUrl = async (urlOrId: string): Promise<Hero> => {
  const url = urlOrId.startsWith("http")
    ? urlOrId
    : `${BASE_URL}/people/${urlOrId}/`;
  return fetchData<Hero>(url);
};
