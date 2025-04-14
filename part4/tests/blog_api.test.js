const { beforeEach, test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const Blog = require("../models/blogs");
const User = require("../models/users");
const helper = require("./test_helper.js");

const app = require("../app");
const api = supertest(app);

let token;
describe("cuando hay posts guardadas, desde un inicio", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await helper.createUser("root", "admin", "sekret");

    const response = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    token = response.body.token;

    let blogObject = helper.initialPosts[0];
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    blogObject = helper.initialPosts[1];
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("los posts se muestran como JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("hay dos posts", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialPosts.length);
  });

  test("El primer post es sobre laguagua", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((e) => e.title);
    assert(titles.includes("laguagua es la movida"));
  });
  test("el identificador único es llamado id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert(blog.id !== undefined);
    });
  });

  test("Se puede hacer DELETE de una nota mediante su id", async () => {
    const response = await api.get("/api/blogs");
    const blogsAtStart = response.body;
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`);
    const secondCall = await api.get("/api/blogs");
    const blogsAtEnd = secondCall.body;
    assert.equal(blogsAtStart.length, blogsAtEnd.length + 1);
  });

  test("Se puede añadir un blog válida por POST", async () => {
    const newBlog = {
      title: "nuevo cosa",
      author: "autorr",
      url: "http://laweb.com",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((e) => e.title);
    assert.strictEqual(response.body.length, helper.initialPosts.length + 1);
    assert(titles.includes("nuevo cosa"));
  });
  test("Si se añade un blog sin token devuelve 401", async () => {
    const newBlog = {
      title: "nuevo cosa",
      author: "autorr",
      url: "http://laweb.com",
      likes: 5,
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert(response.body.error.includes("token invalid"));
  });

  test("Se pueden modificar los likes de un post mediante PUT", async () => {
    const response = await api.get("/api/blogs");
    const blogsAtStart = response.body;
    const blogToUpdate = blogsAtStart[0];
    const likes = 99;
    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: likes,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(202);
    const secondCall = await api.get("/api/blogs");
    const blogsAtEnd = secondCall.body;
    assert.strictEqual(blogsAtEnd[0].likes, likes);
  });
});

describe("Cuando se hace POST a una base de datos vacía", () => {
  test("Si al hacer POST falta la propiedad likes, tiene el valor 0 por defecto", async () => {
    const newBlog = {
      title: "nuevo cosa",
      author: "autorr",
      url: "http://laweb.com",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const lastPosted = response.body[response.body.length - 1];
    assert.strictEqual(lastPosted.likes, 0);
  });

  test("Si al hacer POST falta la propiedad title de los datos solicitados, el backend responde a la solicitud con el código de estado 400 Bad Request", async () => {
    const newBlog = {
      // no title
      author: "autorr",
      url: "http://laweb.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test("Si al hacer POST falta la propiedad url de los datos solicitados, el backend responde a la solicitud con el código de estado 400 Bad Request", async () => {
    const newBlog = {
      title: "untituloo",
      author: "autorr",
      // no url
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
