const express = require("express")
const checkAuth = require("../middleware/check-auth")
const router = express.Router()
const MessageController = require("../controllers/messages")

// ------------------- SEND MESSAGE (FROM , TO) -------------------
// LOGGED IN USER TO SOME EXIST USER
// ADMIN CAN SEND TO ALL OR TO EXIST USER
router.post("/", checkAuth, MessageController.messages_send_message)

// ------------------- GET ALL MESSAGES  -------------------
router.get("/", checkAuth, MessageController.messages_get_messages)

module.exports = router
