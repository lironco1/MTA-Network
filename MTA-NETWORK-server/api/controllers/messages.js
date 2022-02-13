const utills = require("../../utills")
const StatusCodes = require("http-status-codes").StatusCodes
const Message = require("../models/message")
const User = require("../models/user")

// ------------------- SEND MESSAGE (FROM , TO) -------------------
// LOGGED IN USER TO SOME EXIST USER
// ADMIN CAN SEND TO ALL OR TO EXIST USER
exports.messages_send_message = (req, res, next) => {
  User.find({ email: req.body.to })
    .exec()
    .then((user) => {
      if (user.length === 0) {
        console.log("first")
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "no such user " })
      }
      const message = new Message({
        from: req.tokenData.email,
        to: req.body.to, // user email
        text: req.body.text,
        date: utills.getDate(),
      })
      message
        .save()
        .then((result) => {
          res.status(StatusCodes.CREATED).json(result)
        })
        .catch((err) => {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "cannot save the post to DB", err })
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(StatusCodes.FORBIDDEN).json({
        message: "No such User",
      })
    })
}

// ------------------- GET ALL MESSAGES  -------------------
// SIGN IN USERS CAN SEE All MESSAGES SENT BY ALL USERS
exports.messages_get_messages = (req, res, next) => {
  Message.find()
    .exec()
    .then((docs) => {
      res.status(StatusCodes.OK).json(docs)
    })
    .catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    })
}
