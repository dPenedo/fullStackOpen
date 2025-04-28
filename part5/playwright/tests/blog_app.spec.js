const { test, expect, beforeEach, describe } = require("@playwright/test");

const login = async (page, username, password) => {
  await page.getByTestId("test-input-username").fill(username);
  await page.getByTestId("test-input-password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New blog" }).click();
  await page.getByTestId("test-input-title").fill(title);
  await page.getByTestId("test-input-author").fill(author);
  await page.getByTestId("test-input-url").fill(url);
  return page.getByRole("button", { name: "Create it" }).click();
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "nombrePr",
        username: "userPr",
        password: "okok",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameLabel = page.getByText("Username");
    await expect(usernameLabel).toBeVisible();
    const passwordLabel = page.getByText("Password");
    await expect(passwordLabel).toBeVisible();
    await expect(page.getByText("Blogs App")).toBeVisible();
    await expect(page).toHaveTitle("Vite + React");
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      login(page, "userPr", "okok");
      await expect(page.getByText("Blog list")).toBeVisible(); // ...
    });

    test("fails with wrong credentials", async ({ page }) => {
      login(page, "wrongg", "okok");
      await expect(page.getByText("Wrong credential")).toBeVisible(); // ...
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      login(page, "userPr", "okok");
      await expect(page.getByText("Blog list")).toBeVisible(); // ...
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "unTitulo", "Autorr", "https://");
      await expect(
        page.getByText("A new blog added by: Autorr: unTitulo"),
      ).toBeVisible();
    });
    test("The blog can be edited", async ({ page }) => {
      await createBlog(page, "blogToEdit", "Autore", "https://"); // <-- await aquí
    });
  });
});
