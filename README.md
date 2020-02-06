# FindSport2Play

This is a MERN Stack application where player can host an event for other players to join and meet up to play any sports together.

Link - https://findsport2play.herokuapp.com/

## The technologies used to create this project:
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bootstrap 4
- REST API
- Redux

## Running the web app
- Clone the repo
- Add a file called `keys_dev.js` on your config folder
- Add the follow code to keys_dev.js:
```
module.exports = {
    mongoURI: {Add a connection string from MongoDB Alta},
    secretOrKey: {Enter a random string}
};
```
- Run `npm i && npm start` to start your server
- CD to client folder and run `npm i && npm start` to start the web app