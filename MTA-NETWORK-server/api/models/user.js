const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
})

module.exports = mongoose.model("User", userSchema)
