const { beforeEach, test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const Blog = require("../models/blogs");

const initialPosts = [
  {
    title: "laguagua es la movida",
    author: "uno",
    url: "http://laweb.com",
    likes: 3,
  },
  {
    title: "otra cosa",
    author: "un Autor",
    url: "http://laweb.com",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialPosts[0]);
  await blogObject.save();
  blogObject = new Blog(initialPosts[1]);
  await blogObject.save();
});

const app = require("../app");
const api = supertest(app);

test("los posts se muestran como json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("hay dos posts", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialPosts.length);
});

test("el primer post es sobre laguagua", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((e) => e.title);
  assert(titles.includes("laguagua es la movida"));
});

test("Se puede añadir una nota válida", async () => {
  const newBlog = {
    title: "nuevo cosa",
    author: "autorr",
    url: "http://laweb.com",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((e) => e.title);
  assert.strictEqual(response.body.length, initialPosts.length + 1);
  assert(titles.includes("nuevo cosa"));
});

// TODO: continuar
test("author existe", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.author).toBeDefined();
  });
});

after(async () => {
  await mongoose.connection.close();
});
