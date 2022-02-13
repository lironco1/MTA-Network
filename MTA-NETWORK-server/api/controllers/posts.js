const StatusCodes = require("http-status-codes").StatusCodes
const utills = require("../../utills")

const Post = require("../models/post")
const User = require("../models/user")

// ------------------- GET LIST OF POSTS -------------------
// SIGN IN USERS CAN SEE
exports.posts_get_all = (req, res, next) => {
  Post.find()
    .exec()
    .then((docs) => {
      res.status(StatusCodes.OK).json(docs)
    })
    .catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    })
}

// ------------------- SEND POST -------------------
// ONLY SIGN IN, ACTIVE USER CAN SEND POST
exports.posts_create_post = (req, res, next) => {
  User.findOne({ email: req.tokenData.email })
    .exec()
    .then((user) => {
      if (user.status === "active") {
        const post = new Post({
          userEmail: req.tokenData.email,
          userId: user._id,
          text: req.body.text,
          date: utills.getDate(),
        })
        post
          .save()
          .then((result) => {
            res.status(StatusCodes.CREATED).json(result)
          })
          .catch((err) => {
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: "cannot save the post to DB", err })
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "User is not activeted" })
      }
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "cannot find user", err })
    })
}

// ------------------- DELETE POST -------------------
// ADMIN AND THE USER HIMSELF
exports.posts_delete_post = (req, res, next) => {
  const id = req.params.postId
  const token = req.tokenData

  Post.findOne({ _id: id })
    .exec()
    .then((post) => {
      if (post === null) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "No such post" })
      }
      const userId = post.userId
      if (token.email === process.env.ADMIN || token.userId === userId) {
        Post.remove({ _id: id })
          .exec()
          .then((result) => {
            res.status(StatusCodes.OK).json({ message: "Post Deleted", post })
          })
          .catch((err) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
          })
      }
    })
}
