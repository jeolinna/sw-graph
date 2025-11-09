import { render, screen } from "@testing-library/react";
import { HeroCard } from "../HeroCard";
import { createMockHero } from "../../../__tests__/mocks";
import { expect, test } from "vitest";

test("render the hero's name", () => {
  const hero = createMockHero({ name: "Luke Skywalker" });

  render(<HeroCard hero={hero} onSelect={() => {}} />);

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
});
