const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 8081;

app.listen(port, () => console.log(`Server running on port ${port}`));