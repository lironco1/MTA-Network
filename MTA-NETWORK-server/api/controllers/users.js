const utills = require("../../utills")
const jwt = require("jsonwebtoken")
const StatusCodes = require("http-status-codes").StatusCodes
const bcrypt = require("bcrypt")
const User = require("../models/user")

// ------------------- LOGIN -------------------
exports.users_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.status !== "active") {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "This user isnt active" })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Auth failed" })
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          )
          return res
            .status(StatusCodes.OK)
            .json({ message: "Auth successful!", token, user })
        }
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Auth failed" })
      })
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Auth Failed!" })
    })
}

// ------------------- SIGN UP -------------------
exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email }) // Check if the email is used
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "Email is already in used", user })
      } else {
        // HASH THE PASSWORD WITH SALT
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "cant hash" })
          } else {
            const user = new User({
              email: req.body.email, // THIS IS THE USERNAME!
              password: hash, // Hased password with salt 10
              fullname: req.body.fullname,
              date: utills.getDate(),
              status: "created",
            })
            user
              .save()
              .then((result) => {
                res.status(StatusCodes.CREATED).json({
                  message: "user created!",
                  user: result,
                })
              })
              .catch((err) => {
                res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({ message: "Sign Up failed" })
              })
          }
        })
      }
    })
    .catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    })
}

// ------------------- GET ALL USERS -----------------
// ONLY ADMIN
exports.users_list_users = (req, res, next) => {
  if (req.tokenData.email === process.env.ADMIN) {
    User.find()
      .exec()
      .then((docs) => {
        res.status(StatusCodes.OK).json(docs)
      })
      .catch((err) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
      })
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "ONLY ADMIN GET LIST ALL USERS" })
  }
}

// ------------------- DELETE USER -------------------
// ADMIN AND THE USER HIMSELF
exports.users_delete_user = (req, res, next) => {
  const id = req.params.userId
  const token = req.tokenData

  User.find({ _id: id })
    .exec()
    .then((user) => {
      if (user.length === 0) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "No such user" })
      }
      if (token.userId === id || token.email === process.env.ADMIN) {
        User.remove({ _id: id })
          .exec()
          .then((result) => {
            res.status(StatusCodes.OK).json({ message: "User Deleted" })
          })
          .catch((err) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Unauth to do that" })
      }
    })
}

// ------------------- UPDATE USER -------------------
// ONLY ADMIN CAN CHANGE STATUS (ACTIVE / SUSPEND)
exports.users_update_user = (req, res, next) => {
  const id = req.params.userId
  const update = req.body.status

  if (req.tokenData.email === process.env.ADMIN) {
    User.findOneAndUpdate({ _id: id }, { status: update })
      .exec()
      .then((result) => {
        res
          .status(StatusCodes.OK)
          .json({ message: "The user Updated Sucssfuelly" })
      })
      .catch((err) => {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "No such user" })
      })
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Only admin can change user status" })
  }
}
