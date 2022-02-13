const express = require("express")
const StatusCodes = require("http-status-codes").StatusCodes
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const usersRoutes = require("./api/routes/users")
const postsRoutes = require("./api/routes/posts")
const messagesRoutes = require("./api/routes/messages")

// const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

// ----------------- DATA BASE -----------------
mongoose.connect(
  `mongodb+srv://liron:${process.env.MONGO_ATLAS_PW}@js-course.ga8cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)

// ----------------- General App Settings (MIDDLEWARES) -----------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accpet, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(StatusCodes.OK).json({})
  }
  next()
})

app.use("/api/users", usersRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/messages", messagesRoutes)

app.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = StatusCodes.NOT_FOUND
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
