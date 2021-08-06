const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const { logger } = require('./middleware')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use(logger)

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', logger, (req, res) => {
  res.send(`
    <h1>Welcome to my Actions and Projects API</h1>
    <h2>This is a ${req.test}.</h2>
  `)
})

server.use('*', (req, res, next) => {
  res.json({
    message: 'If all else fails, you will see this message!'
  })
})

module.exports = server;
