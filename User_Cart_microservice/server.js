'use strict'

require("./database");

const express = require("express");

var routes = require('./api/routes/routes');

const port = 4000;

const app = express();

app.use(express.json());

routes(app);

app.get('/', (req, res) => {
    res.send("User Cart Microservice. Refer provided documentation for usage.");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
