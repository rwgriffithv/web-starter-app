import { describe, it, expect } from "vitest";
import { createSession } from "./auth";

describe("auth", () => {
  const mockUser = {
    id: 1,
    email: "admin@example.com",
    name: "Admin",
    role: "admin" as const,
    created_at: "2026-01-01",
  };

  it("createSession returns base64-encoded JSON", () => {
    const token = createSession(mockUser);
    expect(typeof token).toBe("string");
    const decoded = JSON.parse(atob(token));
    expect(decoded.userId).toBe(1);
    expect(decoded.role).toBe("admin");
  });

  it("createSession omits sensitive fields", () => {
    const token = createSession(mockUser);
    const decoded = JSON.parse(atob(token));
    expect(decoded.email).toBeUndefined();
    expect(decoded.name).toBeUndefined();
  });
});
