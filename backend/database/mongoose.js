const mongoose = require("mongoose")

// this allows us to use promises to handle asynchronous code
mongoose.Promise = global.Promise

// Database = moviemanager
mongoose
  .connect("mongodb://127.0.0.1:27017/moviemanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error))

module.exports = mongoose
