const logoutRouter = require("express").Router();
logoutRouter.post("/", async (request, response) => {
  console.log("username => ", username);
  console.log("password => ", password);
  const { username, password } = [null, null];
  console.log("Logout!");
  console.log("username => ", username);
  console.log("password => ", password);
});

module.exports = logoutRouter;
