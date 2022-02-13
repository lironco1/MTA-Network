const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.tokenData = decoded
    next()
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "You Must log in first!",
    })
  }
}
