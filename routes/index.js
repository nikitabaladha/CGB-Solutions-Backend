// routes/index.js

const Controller = require("../controllers");
const {
  middleware: Middleware,
  verifyAdmin,
} = require("../middleware/index.js");
const upload = require("../controllers/Blog/uploadImages");

module.exports = (app) => {
  app.post("/api/signup", Controller.User.signup);
  app.post("/api/login", Controller.User.login);

  app.post(
    "/api/blog",
    Middleware,
    upload.fields([
      { name: "bannerImageUrl", maxCount: 1 },
      { name: "contentImageUrl", maxCount: 1 },
    ]),
    Controller.Blog.create
  );

  app.post(
    "/api/approve-create/:id",
    verifyAdmin,
    Controller.Admin.approveCreate
  );

  app.post(
    "/api/reject-create/:id",
    verifyAdmin,
    Controller.Admin.rejectCreate
  );

  app.post(
    "/api/approve-update/:id",
    verifyAdmin,
    Controller.Admin.approveUpdate
  );

  app.post(
    "/api/reject-update/:id",
    verifyAdmin,
    Controller.Admin.rejectUpdate
  );

  app.post(
    "/api/approve-delete/:id",
    verifyAdmin,
    Controller.Admin.approveDelete
  );

  app.post(
    "/api/reject-delete/:id",
    verifyAdmin,
    Controller.Admin.rejectDelete
  );

  app.get("/api/user", Middleware, Controller.User.get);
  app.get("/api/blog/:id", Controller.Blog.getOneById);
  app.get("/api/blog", Controller.Blog.getAll);

  app.get(
    "/api/create-request",
    verifyAdmin,
    Controller.Admin.getAllCreateRequest
  );
  app.get(
    "/api/update-request",
    verifyAdmin,
    Controller.Admin.getAllUpdateRequest
  );
  app.get(
    "/api/delete-request",
    verifyAdmin,
    Controller.Admin.getAllDeleteRequest
  );

  app.get("/api/blog/user/:userId", Middleware, Controller.Blog.getAllByUserId);

  app.put(
    "/api/blog/:id",
    Middleware,
    upload.fields([
      { name: "bannerImageUrl", maxCount: 1 },
      { name: "contentImageUrl", maxCount: 1 },
    ]),
    Controller.Blog.update
  );

  app.delete("/api/blog/:id", Middleware, Controller.Blog.remove);
};
