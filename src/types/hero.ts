export interface Hero {
  id?: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string | number;
  films: (string | number)[];
  starships: (string | number)[];
  vehicles: (string | number)[];
  species: (string | number)[];
  url: string;
  created: string;
  edited: string;
}
