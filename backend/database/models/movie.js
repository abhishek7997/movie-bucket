const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  releaseDate: {
    type: String,
    default: "",
  },
});

const movie = mongoose.model("movie", movieSchema);
module.exports = movie;
