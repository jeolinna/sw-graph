import React from "react";
import { HeroCard } from "./HeroCard";
import type { Hero } from "../../types/hero";

interface HeroListProps {
  heroes: Hero[];
  onSelect: (heroUrl: string) => void;
}

export const HeroList: React.FC<HeroListProps> = ({ heroes, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center p-4">
      {heroes.length > 0 ? (
        heroes.map((hero) => (
          <HeroCard key={hero.url} hero={hero} onSelect={onSelect} />
        ))
      ) : (
        <p className="text-lg text-yellow-400 mt-10">Heroes not found.</p>
      )}
    </div>
  );
};
