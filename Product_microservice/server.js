'use strict'

require("./database");

const express = require("express");

var routes = require('./api/routes/routes');

const port = 3000;

const app = express();

app.use(express.json());

routes(app);

app.get('/', (req, res) => {
    res.send("Product Microservice. Refer provided documentation for usage.");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
