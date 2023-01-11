import { degreesFromCoordinates, limit } from "./util";

describe("degreesFromCoordinates", () => {
  it("generates degrees from coordinates", () => {
    expect(degreesFromCoordinates(-10, 10)).toBe(45);
    expect(degreesFromCoordinates(10, -10)).toBe(225);
    expect(degreesFromCoordinates(0, -10)).toBe(180);
    expect(degreesFromCoordinates(0, 10)).toBe(0);
  });
});

describe("limit", () => {
  it("has upper bounds", () => {
    expect(limit(100, 0, 100)).toBe(100);
    expect(limit(270, 0, 100)).toBe(100);
  });
  it("has lower bounds", () => {
    expect(limit(10, 20, 100)).toBe(20);
    expect(limit(20, 20, 100)).toBe(20);
  });
});
