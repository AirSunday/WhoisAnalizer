module.exports = app => {
    const whoisdbs = require("../controllers/whois.controller.js");
    const usersdbs = require("../controllers/users.controller.js");
    var router = require("express").Router();
    // 
    router.get("/get/get10/:id", whoisdbs.Get10);
    //
    router.get("/get/GetCountDomain/:table", whoisdbs.GetCountDomain);
    //
    router.get("/get/nsservers/:id", whoisdbs.GetNsServers);
    //
    router.get("/get/registrant", whoisdbs.GetRegistrant);
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
    router.get("/users", usersdbs.Authentication)
    //
    // router.post('/sign-in', require('../controllers/sign-in'));
    // router.post('/sign-out', require('../controllers/sign-out'));
    //
    app.use('/api', router);
  };