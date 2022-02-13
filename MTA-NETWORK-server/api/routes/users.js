const express = require("express")
const checkAuth = require("../middleware/check-auth")

const router = express.Router()
const UsersController = require("../controllers/users")

// ------------------- LOGIN -------------------
router.post("/login", UsersController.users_login)

// ------------------- SIGN UP -------------------
router.post("/signup", UsersController.users_signup)

// ------------------- GET ALL USERS -----------------
// ONLY ADMIN
router.get("/", checkAuth, UsersController.users_list_users)

// ------------------- DELETE USER -------------------
// ADMIN AND THE USER HIMSELF
router.delete("/:userId", checkAuth, UsersController.users_delete_user)

// ------------------- UPDATE USER -------------------
// ONLY ADMIN CAN CHANGE STATUS (ACTIVE / SUSPEND)
router.patch("/:userId", checkAuth, UsersController.users_update_user)

module.exports = router
