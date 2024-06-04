// routes/index.js

const Controller = require("../controllers");
const Middleware = require("../middleware/index.js");

module.exports = (app) => {
  app.post("/api/signup", Controller.User.signup);
  app.post("/api/login", Controller.User.login);
  app.get("/api/user", Middleware, Controller.User.get);
};
