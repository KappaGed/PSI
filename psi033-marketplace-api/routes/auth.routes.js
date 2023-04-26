module.exports = app => {
    const auth = require("../controllers/auth.controller");
    var router = require("express").Router();

    // register new user
    router.post("/signup", auth.signup);

    // login new user (with jwt auth)
    router.post("/login", auth.login);

    app.use("/api/auth", router);
}