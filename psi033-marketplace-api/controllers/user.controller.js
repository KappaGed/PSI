const User = require('../models/user.model');

// create and save a new user 
exports.create = (req, res) => {
    // create new user
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // save new user in db
    user
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the new User in the database"
            });
        });
};

// get all users
exports.getAll = (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred while retrieving users from the database" });
        });
};

// find a user by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: `User with id=${id} not found` });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving User with id=${id}` });
        });
};

// find a user by username
exports.findByUsername = (req, res) => {
    const username = req.params.username;
  
    User.findOne({ username: username })
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `User with username=${username} not found` });
        } else {
          res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({ message: `Error retrieving User with username=${username}` });
      });
  }; 

// update a user by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Cannot update User with id=${id}` });
            else res.send({ message: "User was updated successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: `Error updating User with id=${id}` });
        });
};

// delete a user by id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Cannot delete User with id=${id}` });
            else res.send({ message: "User was deleted sucessfully" });
        })
        .catch(err => {
            res.status(500).send({ message: `Error deleting User with id=${id} from database` });
        });
};
