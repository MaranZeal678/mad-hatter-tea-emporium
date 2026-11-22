import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { links } from "../../components/SiteHeader";
import OurStoryPage from "./page";

describe("OurStoryPage", () => {
  it("renders the Our Story page linked from the site navigation", () => {
    expect(links).toContainEqual({ href: "/our-story", label: "Our Story" });

    render(<OurStoryPage />);

    expect(
      screen.getByRole("heading", {
        name: "A curious little tea shop for everyday wonder.",
      }),
    ).toBeTruthy();
    expect(screen.getByText(/The Mad Hatter's Tea Emporium began/)).toBeTruthy();
  });
});
