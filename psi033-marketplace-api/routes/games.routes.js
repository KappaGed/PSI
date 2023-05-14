module.exports = app => {
    const game = require("../controllers/game.controller");
    var router = require("express").Router();

    // create a new game
    router.post("/", game.createGameA);
    // get all games
    router.get("/", game.getAll);

    router.get('/search', game.searchGames);

    router.get('/:id', game.getGameById);
    // search for a game by query
    // router.get("/search", game.searchByName);

    // find a game by id
    // router.get("/:id", game.findOne);

    // find a game by gamename
    //  router.get("/:name", game.findByName);

    // update a game by id
    router.put("/:id", game.update);

    // delete a game by id
    router.delete("/:id", game.delete);

    router.delete("/", game.deleteAll);

    app.use("/api/games", router);
};