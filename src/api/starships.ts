import type { Starship } from "../types/starship";
import { fetchData } from "./client";

const BASE_URL = "https://sw-api.starnavi.io";

export const fetchStarshipByUrl = async (
  urlOrId: string
): Promise<Starship> => {
  const url = urlOrId.startsWith("http")
    ? urlOrId
    : `${BASE_URL}/starships/${urlOrId}/`;
  return fetchData<Starship>(url);
};
