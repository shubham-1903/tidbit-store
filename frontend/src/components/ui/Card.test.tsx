import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";

describe("Card component", () => {
  it("renders with default Level 1 tonal elevation and rounded-lg", () => {
    render(
      <Card data-testid="card">
        <CardContent>Content</CardContent>
      </Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-surface");
    expect(card).toHaveClass("border-border");
    expect(card).toHaveClass("shadow-level1");
    expect(card).toHaveClass("rounded-lg");
  });

  it("applies rounded-xl when radius is xl", () => {
    render(
      <Card data-testid="card" radius="xl">
        <CardContent>Showpiece</CardContent>
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("rounded-xl");
  });

  it("applies hover classes when hoverable is true", () => {
    render(
      <Card data-testid="card" hoverable>
        <CardHeader>Header</CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("hover:shadow-level2");
    expect(card).toHaveClass("cursor-pointer");
  });
});
