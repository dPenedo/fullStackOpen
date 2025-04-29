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

const likeABlog = async (page, title, likes = 1) => {
  const blogItem = page.locator("div.blog", { hasText: title });

  try {
    const showButton = blogItem.getByRole("button", { name: "show" });
    await showButton.waitFor({ state: "visible", timeout: 2000 });
    await showButton.click();
  } catch (error) {
    console.error("error => ", error);
  }

  // Dar like las veces especificadas
  const likeButton = blogItem.getByRole("button", { name: "like" });
  await likeButton.waitFor({ state: "visible" });

  for (let i = 0; i < likes; i++) {
    await likeButton.click();
    await page.waitForTimeout(300);
  }
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    const resetResponse = await request.post("/api/testing/reset");
    expect(resetResponse.status()).toBe(204);
    await request.post("/api/users", {
      data: {
        name: "nombrePr",
        username: "userPr",
        password: "okok",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "second",
        username: "second",
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
      await expect(page.getByText("Blog list")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      login(page, "wrongg", "okok");
      await expect(page.getByText("Wrong credential")).toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      login(page, "userPr", "okok");
      await expect(page.getByText("Blog list")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "unTitulo", "Autorr", "https://");
      await expect(
        page.getByText("A new blog added by: Autorr: unTitulo"),
      ).toBeVisible();
    });
    test("The blog can be liked", async ({ page }) => {
      await createBlog(page, "blogToEdit", "Autore", "https://");
      await likeABlog(page, "blogToEdit", 1);
      await expect(page.getByText("blogToEdit liked")).toBeVisible();
    });
    test("The blog can be deleted", async ({ page }) => {
      await createBlog(page, "blogToDelete", "Autore", "https://");
      const blogItem = page.locator('div.blog:has-text("blogToDelete")');
      await blogItem.getByRole("button", { name: "show" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      await blogItem.getByRole("button", { name: "delete" }).click();
      await expect(page.getByText("blogToDelete deleted")).toBeVisible();
    });
    test("Only creator sees the delete blog option", async ({ page }) => {
      await createBlog(page, "blogToDelete", "Autore", "https://");
      await expect(
        page.getByText("A new blog added by: Autore: blogToDelete"),
      ).toBeVisible();
      await page.getByText("Logout").click();
      await login(page, "second", "okok");
      const blogItem = page.locator('div.blog:has-text("blogToDelete")');
      await blogItem.getByRole("button", { name: "show" }).click();
      const deleteButton = blogItem.getByRole("button", { name: "delete" });
      await expect(deleteButton).toHaveCount(0);
    });
    test("Blogs are ordered by likes", async ({ page }) => {
      await createBlog(page, "first", "Autore", "https://");
      await createBlog(page, "second", "Autore", "https://");
      await createBlog(page, "third", "Autore", "https://");
      await createBlog(page, "fourth", "Autore", "https://");

      await likeABlog(page, "third", 3);
      await likeABlog(page, "second", 2);
      await likeABlog(page, "first", 1);

      await page.waitForTimeout(1000);

      const blogs = await page.getByTestId("blog-item").all();
      const blogTexts = await Promise.all(
        blogs.map((blog) => blog.textContent()),
      );

      expect(blogTexts[0]).toContain("third");
      expect(blogTexts[1]).toContain("second");
      expect(blogTexts[2]).toContain("first");
      expect(blogTexts[3]).toContain("fourth");
    });
  });
});
