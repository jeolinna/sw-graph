import React from "react";
import type { Hero } from "../../types/hero";

interface HeroCardProps {
  hero: Hero;
  onSelect: (heroUrl: string) => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ hero, onSelect }) => {
  const handleClick = () => {
    onSelect(hero.url);
  };

  return (
    <div
      onClick={handleClick}
      className={
        "p-4 m-2 rounded-xl w-auto border-2 border-yellow-400 bg-yellow-50 hover:shadow-md hover:shadow-yellow-100 transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 cursor-pointer"
      }
      style={{ minWidth: "250px" }}
    >
      <h3 className="font-bold text-lg">{hero.name}</h3>
      <p>
        Gender: <span className="font-medium">{hero.gender}</span>
      </p>
      <p>
        Year of birth: <span className="font-medium">{hero.birth_year}</span>
      </p>
      <p className="text-sm mt-2">
        Films: {hero.films?.length || 0}, Starships:{" "}
        {hero.starships?.length || 0}
      </p>
    </div>
  );
};
