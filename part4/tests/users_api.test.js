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

    assert(response.body.some((user)=> user.username === 'root'), true)
  })

  test("la creación funciona con un nuevo username", async () => {
    const usersAtStart = await helper.usersInDB();
    console.log("usersAtStart", usersAtStart)

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
    console.log("usersAtEnd", usersAtEnd)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
  //   test("la creación falla con el statuscode apropiado cuando ")
});

after(async () => {
  await mongoose.connection.close();
});
