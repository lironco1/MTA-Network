const express = require("express")
const checkAuth = require("../middleware/check-auth")
const router = express.Router()

const PostsController = require("../controllers/posts")

// ------------------- GET LIST OF POSTS -------------------
// SIGN IN USERS CAN SEE
router.get("/", checkAuth, PostsController.posts_get_all)

// ------------------- SEND POST -------------------
// ONLY SIGN IN, ACTIVE USER CAN SEND POST
router.post("/", checkAuth, PostsController.posts_create_post)

// ------------------- DELETE POST -------------------
// ADMIN AND THE USER HIMSELF
router.delete("/:postId", checkAuth, PostsController.posts_delete_post)

module.exports = router
