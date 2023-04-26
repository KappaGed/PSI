module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();

    // register new user
    router.post("/signup", auth.signup);

    // login new user (with jwt auth)
    router.post("/login", auth.login);

    app.use("/api/auth", router);
}