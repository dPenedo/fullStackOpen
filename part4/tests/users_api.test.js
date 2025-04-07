const { beforeEach, test, after, describe } = require("node:test");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const helper = require("./test_helper.js");

const app = require("../app");
const api = supertest(app);

describe("cuando hay un usuario inicial en la db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });
  test("Los usuarios se muestran como JSON", async () => {
    const response = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    assert(response.body.some((user)=> user.username === 'root'))
  })

  test("la creación funciona con un nuevo username", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "elpelanas",
      name: "senior pelanas",
      password: "laguagua123",
    };
    await api
      .post("/api/users")
        .send(newUser)
      .expect(201)
       .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
  test("crear un usuario con username < 3 chars falla con el statuscode 400 y  da el mensaje de Username is too short", async () => {
    const newUser = {
      username: "la",
      name: "usuario",
      password: "lagugua"
    }
    const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
    assert(response.body.error.includes("Username is too short"))
  })
  test("crear un usuario con username repetido da status code 400 y da un error username must be unique", async () => {
    const newUser = {
      username: "root",
      name: "userrr",
      password: "lallala"
    }
    const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
    assert(response.body.error.includes("username must be unique"))
  })
  test("crear un usuario con password de  menos de 3 caracteres da status code de 400 y da el error password must be longer than 3 chars", async () => {
    const newUser = {
      username: "elusuario",
      name: "usuario",
      password: "la"
    }
    const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
    assert(response.body.error.includes("password must be longer than 3 chars"))
  })
});

after(async () => {
  await mongoose.connection.close();
});
