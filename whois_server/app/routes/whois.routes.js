module.exports = (app) => {
  const whoisdbs = require("../controllers/whois.controller.js");
  const usersdbs = require("../controllers/users.controller.js");
  const adminController = require("../controllers/admin.controller.js");
  const router = require("express").Router();
  //
  router.get("/get/get10/:id", whoisdbs.Get10);
  //
  router.get("/get/GetCountDomain/:table", whoisdbs.GetCountDomain);
  //
  router.get("/get/nsservers/:id", whoisdbs.GetNsServers);
  //
  router.get("/get/registrant/:id", whoisdbs.GetRegistrant);
  //
  router.post("/get/getdomain", whoisdbs.GetWhoisInfo);
  //
  router.post("/users/create", usersdbs.create);
  //
  router.post("/users/Domain", usersdbs.AddDomain);
  //
  router.put("/users/Domain", usersdbs.DeleteDomain);
  //
  router.post("/users/AllDomains", usersdbs.GetDomain);
  //
  router.post("/users/findout", usersdbs.findOneEmail);
  //
  router.post("/users/findbyid", usersdbs.findOneId);
  //
  router.post("/users/update", usersdbs.update);
  //
  router.delete("/users", usersdbs.delete);
  //
  router.get("/users", usersdbs.Authentication);
  //
  router.post("/news", usersdbs.GetNews);
  //
  router.post("/news/title", usersdbs.GetNewsText);
  //
  router.get("/news/count", usersdbs.GetCountNews);
  //
  router.post("/users/getrole", usersdbs.GetUserRole);
  //
  //
  //
  //
  router.get("/admin/user/:id", adminController.GetAllUsers);
  //
  router.get("/admin/countusers", adminController.GetCountUsers);
  //
  router.post("/admin/userdelete", adminController.DeleteUser);
  //
  router.post("/admin/changerole", adminController.ChangeRole);
  //
  router.post("/admin/news", adminController.CreateNews);
  //
  router.post("/admin/getallnews/:id", adminController.GetAllTitleNews);
  //
  router.put("/admin/news", adminController.ChangeNews);
  //
  router.post("/admin/newsdelete", adminController.DeleteNews);
  //
  router.post("/admin/url/get", adminController.GetUrlDomain);
  //
  router.post("/admin/url/change", adminController.ChangeUrlDomain);
  //
  app.use("/api", router);
};
