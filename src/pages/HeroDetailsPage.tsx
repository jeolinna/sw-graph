import React from "react";
import { useHeroDetails } from "../hooks/useHeroDetails";
import { HeroGraph } from "../components/HeroGraph/HeroGraph";

interface HeroDetailsPageProps {
  heroUrl: string;
  onBack: () => void;
}

const HeroDetailsPage: React.FC<HeroDetailsPageProps> = ({
  heroUrl,
  onBack,
}) => {
  const { data, isLoading, isError, error } = useHeroDetails(heroUrl);

  if (isLoading) {
    return (
      <div className="text-center p-20 text-xl text-yellow-400">
        Download hero details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-20">
        <h1 className="text-2xl text-red-500 mb-5">
          Error loading hero details!
        </h1>
        {error && <p className="text-red-600 mb-5">{error.message}</p>}
        <button
          onClick={onBack}
          className="bg-yellow-400 hover:bg-yellow-600 font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Back to list
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-20">
        <h1 className="text-2xl text-red-500 mb-5">
          No data found for this hero.
        </h1>
        <button
          onClick={onBack}
          className="bg-yellow-400 hover:bg-yellow-600 font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <button
        onClick={onBack}
        className="bg-yellow-400 hover:bg-yellow-600 font-bold py-2 px-4 rounded-lg mb-5 transition-colors"
      >
        &lt; Back to list
      </button>

      <h2 className="text-3xl font-bold text-yellow-400 mb-5">
        Graph: {data.hero.name}
      </h2>

      <HeroGraph details={data} />

      <div className="mt-8 p-4 bg-yellow-400 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Hero info:</h3>
        <p className="mb-2">
          <strong>Films:</strong>{" "}
          {data.films.map((f) => f.title).join(", ") || "Did not appear"}
        </p>
        <p>
          <strong>Starships:</strong>{" "}
          {data.starships.map((s) => s.name).join(", ") || "Has no starships."}
        </p>
      </div>
    </div>
  );
};

export default HeroDetailsPage;
