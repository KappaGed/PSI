module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    // create a new user
    router.post("/", user.create);

    // find a user by id
    router.get("/:id", user.findOne);

    // update a user by id
    router.put("/:id", user.update);

    // delete a user by id
    router.delete("/:id", user.delete);

    app.use("/api/users", router);
};