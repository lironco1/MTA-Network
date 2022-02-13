const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userEmail: { type: String, ref: "User", required: true },
  userId: { type: String, ref: "User", required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
})

module.exports = mongoose.model("Post", postSchema)
