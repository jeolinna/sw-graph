import { render, screen } from "@testing-library/react";
import { HeroList } from "../HeroList";
import { createMockHero } from "../../../__tests__/mocks";
import { expect, test } from "vitest";

test("displays a list of characters", () => {
  render(<HeroList heroes={[createMockHero()]} onSelect={() => {}} />);
  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
});

test("displays a message if there are no characters", () => {
  render(<HeroList heroes={[]} onSelect={() => {}} />);
  expect(screen.getByText("Heroes not found.")).toBeInTheDocument();
});
