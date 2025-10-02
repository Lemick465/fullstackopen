const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogs')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error(error.message))

app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(express.json())

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app