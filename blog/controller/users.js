const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const userObject = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await userObject.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
