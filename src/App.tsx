import React from "react";
import { HeroesPage } from "./pages/HeroesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import HeroDetailsPage from "./pages/HeroDetailsPage";

const queryClient = new QueryClient();

/**
 * Component for the hero details page that uses URL parameters.
 * Allows direct links to the hero page and reloading without losing state.
 */
const HeroDetailsRoute: React.FC = () => {
  const navigate = useNavigate();
  const { heroId } = useParams<{ heroId: string }>();

  const handleBack = () => {
    navigate("/");
  };

  const heroUrl = heroId ? `https://sw-api.starnavi.io/people/${heroId}/` : "";

  return <HeroDetailsPage heroUrl={heroUrl} onBack={handleBack} />;
};

/**
 * Main routing component of the application
 * Responsible for navigation between pages
 */
const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const handleHeroSelect = (url: string) => {
    const heroId = extractHeroIdFromUrl(url);
    if (heroId) {
      navigate(`/hero/${heroId}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HeroesPage onSelect={handleHeroSelect} />} />
      <Route path="/hero/:heroId" element={<HeroDetailsRoute />} />
      <Route
        path="*"
        element={
          <h1 className="text-4xl text-center p-10">404: Page not found</h1>
        }
      />
    </Routes>
  );
};

/**
 * Helper function for extracting hero ID from URL
 * Handles both full URLs and just IDs
 */
function extractHeroIdFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((part) => part);
    return pathParts[pathParts.length - 1];
  } catch {
    return url;
  }
}

/**
 * Root component of the application
 * Provides providers for state (React Query) and routing (React Router)
 */
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Router basename="/sw-graph">
      <AppRoutes />
    </Router>
  </QueryClientProvider>
);

export default App;
