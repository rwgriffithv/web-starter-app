import { describe, it, expect, beforeAll } from "vitest";
import { createSession, hashPassword, verifyPassword } from "./auth";
import type { User } from "./db";

beforeAll(() => {
  process.env.ADMIN_USERNAME = "admin";
  process.env.ADMIN_PASSWORD = "test-admin";
  process.env.SESSION_SECRET = "test-secret-that-is-at-least-thirty-two-chars!!";
});

describe("auth", () => {
  const mockUser: User = {
    id: 1,
    username: "admin",
    name: "Admin",
    role: "admin",
    password: "",
    created_at: "2026-01-01",
  };

  it("createSession returns a signed token", () => {
    const token = createSession(mockUser);
    expect(typeof token).toBe("string");
    const parts = token.split(".");
    expect(parts).toHaveLength(2);
    expect(parts[0]).toBeTruthy();
    expect(parts[1]).toBeTruthy();
  });

  it("createSession encodes session data in payload", () => {
    const token = createSession(mockUser);
    const payload = token.split(".")[0];
    const decoded = JSON.parse(payload);
    expect(decoded.userId).toBe(1);
    expect(decoded.role).toBe("admin");
  });

  it("createSession omits sensitive fields", () => {
    const token = createSession(mockUser);
    const payload = token.split(".")[0];
    const decoded = JSON.parse(payload);
    expect(decoded.username).toBeUndefined();
    expect(decoded.name).toBeUndefined();
  });

  it("hashPassword produces salt:hash format", () => {
    const hashed = hashPassword("test-password");
    expect(typeof hashed).toBe("string");
    expect(hashed).toContain(":");
    const parts = hashed.split(":");
    expect(parts).toHaveLength(2);
    expect(parts[0]).toBeTruthy();
    expect(parts[1]).toBeTruthy();
  });

  it("verifyPassword returns true for correct password", () => {
    const hashed = hashPassword("correct-password");
    expect(verifyPassword("correct-password", hashed)).toBe(true);
  });

  it("verifyPassword returns false for incorrect password", () => {
    const hashed = hashPassword("real-password");
    expect(verifyPassword("wrong-password", hashed)).toBe(false);
  });
});
