const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  from: { type: String, ref: "User", required: true },
  to: { type: String, ref: "User", required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
})

module.exports = mongoose.model("Message", messageSchema)
