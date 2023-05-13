const Game = require('../models/game.model');

exports.getAll = (req, res) => {
    Game.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || "An error occurred while retrieving games from the database" });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }
    const id = req.params.id;

    Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data)
            res.status(404).send({ message: `Cannot update User with id=${id}` });
        else res.send({ message: "User was updated successfully" });
    }).catch(err => {
        res.status(500).send({ message: `Error updating User with id=${id}` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Game.findByIdAndRemove(id).then(data => {
        if (!data)
            res.status(404).send({ message: `Cannot delete game with id=${id}` });
        else res.send({ message: "Game was deleted sucessfully" });
    }).catch(err => {
        res.status(500).send({ message: `Error deleting User with id=${id} from database` });
    });
};

exports.deleteAll = (req, res) => {
    Game.deleteMany({}).then(data => {
        if (data.deletedCount === 0) {
            res.status(404).send({ message: "No games found to delete" });
        } else {
            res.send({ message: `Deleted ${data.deletedCount} games successfully` });
        }
    }).catch(err => {
        res.status(500).send({ message: "Error deleting games from database" });
    });
};


exports.searchGames = (req, res) => {
    const term = req.query.term;
    if (!term) {
        return res.status(400).json({ message: 'Search term is required.' });
    }
    Game.find({ name: { $regex: term, $options: 'i' } })
        .then(games => {
            res.status(200).json(games);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'An error occurred while searching for games.' });
        });
};

exports.createGame = async (req, res) => {
    try {
        const {
            _id,
            name,
            type,
            description,
            platform,
            languages,
            price,
            generalRating,
            reviews,
            imageUrl,
            otherImages,
            videoLink
        } = req.body;

        // Check if the game already exists
        const gameExists = await Game.findOne({ _id });
        if (gameExists) {
            return res.status(409).json({ message: 'Game already exists' });
        }

        // Create a new game
        const game = new Game({
            _id,
            name,
            type,
            description,
            platform,
            languages,
            price,
            generalRating,
            reviews,
            imageUrl,
            otherImages,
            videoLink
        });
        await game.save();

        return res.status(201).json({ message: 'Game created successfully', game });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createGameA = async (req, res) => {
    try {
        const game = new Game(req.body);
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

