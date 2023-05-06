module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();

    // create a new user
    router.post("/", user.create);

    // get all users
    router.get("/", user.getAll);

    // search for a user by query
    router.get("/search", user.searchByUsername);

    // find a user by id
    router.get("/:id", user.findOne);

    // find a user by username
    router.get("/username/:username", user.findByUsername);

    // update a user by id
    router.put("/:id", user.update);

    // delete a user by id
    router.delete("/:id", user.delete);

    app.use("/api/users", router);
};