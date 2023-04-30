const express = require("express");
const cors = require("cors");

var corsOptions = {
    origin: ["http://localhost:8081", "http://localhost:4200"]
};

const app = express();

// settings
app.use(cors(corsOptions));
app.use(express.json()); // parse requests w/ type application/json
app.use(express.urlencoded({ extended: true })); // parse requests w/ type application/x-www-form-urlencoded
app.use('profile-pictures/', express.static('profile-pictures/'));

// simple route to test
app.get("/", (req, res) => {
    res.json({ message: "Welcome to our marketplace!" });
});


// api routes
require("./routes/user.routes")(app); // user
require("./routes/auth.routes")(app); // auth


// set port/listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// mongodb db
const db = require("./models/index");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Sucessfully conntected to database!");
    })
    .catch(err => {
        console.log("Error connecting to database!", err);
        process.exit();
    });