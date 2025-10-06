const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'username and password are required' })
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const userObject = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await userObject.save()

  // Ensuring hash is not leaked
  const safeUser = savedUser.toJSON()
  delete safeUser.passwordHash

  response.status(201).json(savedUser)
})

module.exports = usersRouter
