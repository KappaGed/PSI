module.exports = app => {
    const init = require("../controllers/init.controller");
    var router = require("express").Router();

    router.post('/init', init.createDb);

    app.use("/", router);
};