import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OurStoryPage from "./page";

describe("OurStoryPage", () => {
  it("renders the Our Story route content", () => {
    render(<OurStoryPage />);

    expect(screen.getByRole("heading", { name: "Tea for curious wanderers" })).toBeTruthy();
  });
});
