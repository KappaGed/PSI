const express = require("express");
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:8081"
};

const app = express();

// settings
app.use(cors(corsOptions));
app.use(express.json()); // parse requests w/ type application/json
app.use(express.urlencoded({ extended: true })); // parse requests w/ type application/x-www-form-urlencoded

// simple route to test
app.get("/", (req, res) => {
    res.json({});
});