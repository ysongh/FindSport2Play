# FindSport2Play

This is a MERN Stack application where player can host an event for other players to join and meet up to play any sports together.

Link - https://findsport2play.herokuapp.com/

<p align = "center">
    <img src="https://res.cloudinary.com/ysongit/image/upload/v1584496558/project/Frame_1_mojlxa.png" />
</p>

## The technologies used to create this project:
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- Material-UI
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

## Preview
- Landing
![landing](https://res.cloudinary.com/ysongit/image/upload/v1581738547/project/Screen_Shot_2020-02-14_at_10.48.57_PM_b8c3lf.png "Landing")

- Sign Up
![sign up](https://res.cloudinary.com/ysongit/image/upload/v1581738611/project/Screen_Shot_2020-02-14_at_10.49.59_PM_mxgnd4.png "Sign Up")

- Post Event
![post event](https://res.cloudinary.com/ysongit/image/upload/v1581738666/project/Screen_Shot_2020-02-14_at_10.50.50_PM_icdr0w.png "Post Event")

- Events
![events](https://res.cloudinary.com/ysongit/image/upload/v1581904339/project/Screen_Shot_2020-02-16_at_8.52.09_PM_omjjhk.png "Events")

- Event Detail
![event detail](https://res.cloudinary.com/ysongit/image/upload/v1581738883/project/Screen_Shot_2020-02-14_at_10.54.32_PM_ayxsey.png "Event Detail")