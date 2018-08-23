const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./routes/api/users');
const events = require('./routes/api/events');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/events', events);

const port = 8081;

app.listen(port, () => console.log(`Server running on port ${port}`));