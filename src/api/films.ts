import type { Film } from "../types/film";
import { fetchData } from "./client";

const BASE_URL = "https://sw-api.starnavi.io";

export const fetchFilmByUrl = async (urlOrId: string): Promise<Film> => {
  const url = urlOrId.startsWith("http")
    ? urlOrId
    : `${BASE_URL}/films/${urlOrId}/`;
  return fetchData<Film>(url);
};
