import { test, expect } from "@playwright/test";

test("home page loads with title and feature cards", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Build your next web app, fast.");
  const cards = page.locator(".card");
  await expect(cards.first()).toBeVisible();
  await expect(cards).toHaveCount(6);
});

test("navigation links work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Features", exact: true }).click();
  await expect(page).toHaveURL("/features");
  await expect(page.locator("h1")).toHaveText("Features");
});

test("login link visible in header", async ({ page }) => {
  await page.goto("/");
  const signIn = page.getByRole("link", { name: "Sign In" });
  await expect(signIn).toBeVisible();
});
