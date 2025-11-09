import type { Hero } from "../types/hero";

export const createMockHero = (partial: Partial<Hero> = {}): Hero => ({
  id: 1,
  name: "Luke Skywalker",
  url: "x",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "1",
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: "",
  edited: "",
  ...partial,
});
