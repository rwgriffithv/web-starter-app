import { test, expect } from "@playwright/test";

test("redirects to login when accessing admin without auth", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL("/login");
});

test("login with valid credentials redirects to admin", async ({ page }) => {
  await page.goto("/login");
  await page.fill("input[name=email]", "admin@example.com");
  await page.fill("input[name=password]", "admin");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/\/admin/);
});

test("login with invalid credentials shows error", async ({ page }) => {
  await page.goto("/login");
  await page.fill("input[name=email]", "wrong@example.com");
  await page.fill("input[name=password]", "wrong");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid email or password.")).toBeVisible();
});

test("admin dashboard shows stats and user table", async ({ page }) => {
  await page.goto("/login");
  await page.fill("input[name=email]", "admin@example.com");
  await page.fill("input[name=password]", "admin");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/\/admin/);
  const statCards = page.locator(".stat-card");
  await expect(statCards).toHaveCount(3);
  await expect(page.locator("table")).toBeVisible();
});
