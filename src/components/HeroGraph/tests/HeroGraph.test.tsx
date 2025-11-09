import { render, screen } from "@testing-library/react";
import { HeroGraph } from "../HeroGraph";
import { createMockHero } from "../../../__tests__/mocks";
import { expect, test } from "vitest";

test("displays a message if there are no movies or ships", () => {
  render(
    <HeroGraph
      details={{
        hero: createMockHero(),
        films: [],
        starships: [],
      }}
    />
  );

  expect(screen.getByText(/Has no movies or starships/i)).toBeInTheDocument();
});
