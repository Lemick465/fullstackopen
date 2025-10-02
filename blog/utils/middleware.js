const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(400).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.message === 'CastError') {
    response.status(400).send({ error: 'malformated id' })
  } else if (error.message === 'ValidationError') {
    response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
