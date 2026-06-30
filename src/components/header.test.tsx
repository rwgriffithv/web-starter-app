import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("renders title", () => {
    render(<Header title="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<Header title="Dashboard" description="Overview of stats." />);
    expect(screen.getByText("Overview of stats.")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    const { container } = render(<Header title="Dashboard" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });
});
