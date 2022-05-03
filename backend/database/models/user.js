const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
})

const user = mongoose.model("user", userSchema)
module.exports = user
