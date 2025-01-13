/**
 * Author: Elliot C
 * 
 * @fileoverview Main application file for the backend server.
 * @requires express
 */

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

// Sync the database
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized.");
});

//Enable CORS
app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to labeling information system application." });
});

require("./routes/label.routes")(app);
require("./routes/patient.routes")(app);
require("./routes/labelHistory.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});