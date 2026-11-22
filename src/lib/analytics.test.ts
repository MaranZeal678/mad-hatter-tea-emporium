import { afterEach, describe, expect, it, vi } from "vitest";
import { track } from "./analytics";

describe("track", () => {
  afterEach(() => {
    delete window.hatterAnalytics;
    vi.restoreAllMocks();
  });

  it("does not throw when analytics has not loaded", () => {
    expect(() => track("orders_viewed")).not.toThrow();
  });

  it("sends events when analytics is available", () => {
    window.history.pushState({}, "", "/orders");
    window.hatterAnalytics = { track: vi.fn() };

    track("orders_viewed", { source: "test" });

    expect(window.hatterAnalytics.track).toHaveBeenCalledWith("orders_viewed", {
      path: "/orders",
      source: "test",
    });
  });
});
