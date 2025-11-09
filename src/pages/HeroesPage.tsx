import React, { useState } from "react";
import { HeroList } from "../components/HeroList/HeroList";
import { useHeroes } from "../hooks/useHeroes";
import type { Hero } from "../types/hero";

interface HeroesPageProps {
  onSelect: (heroUrl: string) => void;
}

export const HeroesPage: React.FC<HeroesPageProps> = ({ onSelect }) => {
  // State for the current pagination page
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useHeroes(page);

  const heroes: Hero[] = data?.results || [];

  const handleNextPage = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.previous) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-20 text-xl text-blue-600">
        Loading heroes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-20 text-xl text-red-600">
        Data loading error!
      </div>
    );
  }

  // Calculating the total number of pages based on the number of elements
  const totalPages = data?.count ? Math.ceil(data.count / 10) : 1;

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-extrabold text-center p-8 text-yellow-400">
        Star Wars Heroes
      </h1>

      <HeroList heroes={heroes} onSelect={onSelect} />

      <div className="text-center p-8">
        <button
          onClick={handlePrevPage}
          disabled={!data?.previous}
          className="bg-yellow-400 hover:bg-yellow-600 font-bold py-2 px-4 rounded-lg mx-2 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
        >
          &lt;
        </button>

        <span className="text-lg text-yellow-400 font-semibold mx-4">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!data?.next}
          className="bg-yellow-400 hover:bg-yellow-600 font-bold py-2 px-4 rounded-lg mx-2 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
