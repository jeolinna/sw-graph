import { render, screen } from "@testing-library/react";
import { useHeroDetails } from "../../hooks/useHeroDetails";
import HeroDetailsPage from "../HeroDetailsPage";
import { expect, test, vi } from "vitest";

vi.mock("../../hooks/useHeroDetails");

test("displays error", () => {
  (useHeroDetails as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    isError: true,
    error: { message: "Network failed" },
  });

  render(<HeroDetailsPage heroUrl="x" onBack={() => {}} />);

  expect(screen.getByText(/Error loading hero details/i)).toBeInTheDocument();
});
