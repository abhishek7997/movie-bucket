const PORT = 3000;

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("./database/mongoose");

const user = require("./database/models/user");
const movie = require("./database/models/movie");

/*
CORS - Cross Origin Request Security
Requests must come from same port (3000) in the same domain (localhost), else they get rejected
to prevent this we use cors
*/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

// user URLS

app.get("/users", (req, res) => {
  user
    .find({})
    .then((users) => res.send(users))
    .catch((error) => console.log(error));
});

app.post("/users", (req, res) => {
  new user({
    title: req.body.title,
  })
    .save()
    .then((user) => res.send(user))
    .catch((error) => console.log(error));
});

app.get("/users/:userId", (req, res) => {
  user
    .find({ _id: req.params.userId })
    .then((user) => res.send(user))
    .catch((error) => console.log(error));
});

app.patch("/users/:userId", (req, res) => {
  user
    .findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
    .then((user) => res.send(user))
    .catch((error) => console.log(error));
});

app.delete("/users/:userId", (req, res) => {
  const deletemovies = (usr) => {
    movie
      .deleteMany({ _userId: usr._id })
      .then(() => usr)
      .catch((error) => console.log(error));
  };
  const User = user
    .findOneAndDelete({ _id: req.params.userId })
    .then((usr) => {
      res.send(deletemovies(usr));
    })
    .catch((error) => console.log(error));
});

// movie URLS
app.get("/users/:userId/movies", (req, res) => {
  movie
    .find({ _userId: req.params.userId })
    .then((movies) => res.send(movies))
    .catch((error) => console.log(error));
});

app.post("/users/:userId/movies", (req, res) => {
  new movie({
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    _userId: req.params.userId,
  })
    .save()
    .then((movie) => res.send(movie))
    .catch((error) => console.log(error));
});

app.get("/users/:userId/movies/:movieId", (req, res) => {
  movie
    .find({ _userId: req.params.userId, _id: req.params.movieId })
    .then((movie) => res.send(movie))
    .catch((error) => console.log(error));
});

app.patch("/users/:userId/movies/:movieId", (req, res) => {
  movie
    .findOneAndUpdate(
      { _userId: req.params.userId, _id: req.params.movieId },
      { $set: req.body }
    )
    .then((movie) => res.send(movie))
    .catch((error) => console.log(error));
});

app.delete("/users/:userId/movies/:movieId", (req, res) => {
  movie
    .findOneAndDelete({ _userId: req.params.userId, _id: req.params.movieId })
    .then((movie) => res.send(movie))
    .catch((error) => console.log(error));
});

app.listen(PORT, () => console.log("Server running..."));
