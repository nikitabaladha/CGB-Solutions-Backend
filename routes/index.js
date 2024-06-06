// routes/index.js

const Controller = require("../controllers");
const Middleware = require("../middleware/index.js");
const upload = require("../controllers/Blog/uploadImages");

module.exports = (app) => {
  app.post("/api/signup", Controller.User.signup);
  app.post("/api/login", Controller.User.login);
  app.get("/api/user", Middleware, Controller.User.get);

  app.post(
    "/api/blog",
    Middleware,
    upload.fields([
      { name: "bannerImageUrl", maxCount: 1 },
      { name: "contentImageUrl", maxCount: 1 },
    ]),
    Controller.Blog.create
  );
  app.get("/api/blog/:id", Middleware, Controller.Blog.getOneById);
  app.get("/api/blog", Controller.Blog.getAll);
  app.put(
    "api/blog/:id",
    Middleware,
    upload.fields([
      { name: "bannerImageUrl", maxCount: 1 },
      { name: "contentImageUrl", maxCount: 1 },
    ]),
    Controller.Blog.update
  );
};
