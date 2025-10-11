const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const jwtPayload = {
    username,
    id: user._id,
  }

  const token = jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: 60 * 60 })

  response.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
